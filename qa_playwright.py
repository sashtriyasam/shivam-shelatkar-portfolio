import os
import json
import re
from playwright.sync_api import sync_playwright

BASE_DIR = "D:/TESTWEB"
SCREENSHOT_DIR = os.path.join(BASE_DIR, "qa-fresh")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

URL = "http://localhost:3000"

pages = [
    ("", "home"),
    ("/work", "work"),
    ("/work/depthwizard", "work_depthwizard"),
    ("/about", "about"),
    ("/contact", "contact"),
]

viewports = [
    {"width": 1440, "height": 900},
    {"width": 1920, "height": 1080},
    {"width": 1280, "height": 800},
    {"width": 1024, "height": 768},
    {"width": 768, "height": 1024},
    {"width": 390, "height": 844},
    {"width": 375, "height": 812},
]

EXPECTED_DISPLAY_FONT = "Space Grotesk"
EXPECTED_BODY_FONT = "Inter"

BLUE_LINK_COLORS = {
    "#0000ee", "#0000f", "#0000f0", "#0000ff",
    "rgb(0, 0, 238)", "rgb(0, 0, 255)",
    "rgba(0, 0, 238, 1)", "rgba(0, 0, 255, 1)",
    "blue", "rgb(0, 0, 255)",
}


def is_blue_link_color(color):
    if color is None:
        return False
    color = color.strip().lower()
    color = color.replace(" ", "")
    return color in BLUE_LINK_COLORS or color.startswith("rgb(0, 0,") or color.startswith("rgba(0, 0,")


def is_default_serif(family):
    if family is None:
        return False
    family = family.strip().lower()
    serif_fallbacks = ("ui-serif", "georgia", "serif", "times", "times new roman")
    return any(fb in family for fb in serif_fallbacks)


def analyze_fonts(family):
    if not family:
        return {"primary": "", "is_default_serif": False, "raw": ""}
    family = family.strip()
    parts = [p.strip().strip('"').strip("'") for p in family.split(",")]
    primary = parts[0] if parts else ""
    return {
        "primary": primary,
        "is_default_serif": is_default_serif(family),
        "raw": family,
        "fallbacks": parts[1:],
    }


def run_checks(page, page_name, viewport):
    page_errors = []

    def on_console(msg):
        if msg.type == "error":
            page_errors.append(msg.text)

    page.on("console", on_console)

    result = {
        "page": page_name,
        "viewport": f"{viewport['width']}x{viewport['height']}",
        "url": URL + ("" if page_name == "home" else page_name),
        "font_space_grotesk": None,
        "font_inter": None,
        "body_font": None,
        "h1_font": None,
        "links": [],
        "console_errors": page_errors,
        "failures": [],
    }

    try:
        page.evaluate("() => { document.fonts.ready; }")
    except Exception:
        pass

    font_checks = page.evaluate("""() => {
        const result = {};
        try { result.spaceGrotesk = document.fonts.check('Space Grotesk'); }
        catch (e) { result.spaceGrotesk = 'ERROR: ' + e.message; }
        try { result.inter = document.fonts.check('Inter'); }
        catch (e) { result.inter = 'ERROR: ' + e.message; }
        return result;
    }""")
    result["font_space_grotesk"] = font_checks.get("spaceGrotesk")
    result["font_inter"] = font_checks.get("inter")

    fonts = page.evaluate("""() => {
        const result = {};
        const body = document.querySelector('body');
        const h1 = document.querySelector('h1');
        result.body = body ? window.getComputedStyle(body).fontFamily : 'N/A';
        result.h1 = h1 ? window.getComputedStyle(h1).fontFamily : 'N/A';
        return result;
    }""")
    result["body_font"] = fonts.get("body")
    result["h1_font"] = fonts.get("h1")

    links = page.evaluate("""() => {
        const result = [];
        document.querySelectorAll('a').forEach((a, index) => {
            const style = window.getComputedStyle(a);
            const rect = a.getBoundingClientRect();
            result.push({
                index: index,
                text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
                href: a.getAttribute('href'),
                color: style.color,
                textDecoration: style.textDecorationLine,
                textDecorationStyle: style.textDecorationStyle,
                textDecorationThickness: style.textDecorationThickness,
                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
            });
        });
        return result;
    }""")
    result["links"] = links

    for link in links:
        issues = []
        if link.get("textDecorationLine", "").lower() != "none":
            issues.append("text-decoration underline")
        if is_blue_link_color(link.get("color")):
            issues.append("default browser blue color")
        if issues:
            result["failures"].append({
                "type": "link_styling",
                "link_index": link.get("index"),
                "link_text": link.get("text"),
                "issues": issues,
                "color": link.get("color"),
                "textDecoration": link.get("textDecorationLine"),
            })

    if is_default_serif(result.get("body_font")):
        result["failures"].append({
            "type": "font",
            "element": "body",
            "font": result.get("body_font"),
            "expected": EXPECTED_BODY_FONT,
            "message": "body computed font-family falls back to default serif",
        })

    if is_default_serif(result.get("h1_font")):
        result["failures"].append({
            "type": "font",
            "element": "h1",
            "font": result.get("h1_font"),
            "expected": EXPECTED_DISPLAY_FONT,
            "message": "h1 computed font-family falls back to default serif",
        })

    if result.get("font_space_grotesk") is False:
        result["failures"].append({
            "type": "font",
            "element": "document.fonts.check",
            "font": EXPECTED_DISPLAY_FONT,
            "message": "Space Grotesk font is not loaded (document.fonts.check returned false)",
        })

    if result.get("font_inter") is False:
        result["failures"].append({
            "type": "font",
            "element": "document.fonts.check",
            "font": EXPECTED_BODY_FONT,
            "message": "Inter font is not loaded (document.fonts.check returned false)",
        })

    if page_errors:
        result["failures"].append({
            "type": "console",
            "errors": page_errors,
            "message": f"{len(page_errors)} console error(s) detected",
        })

    page.remove_listener("console", on_console)
    return result


def take_screenshot(page, page_name, viewport):
    filename = os.path.join(SCREENSHOT_DIR, f"{page_name}_{viewport['width']}x{viewport['height']}.png")
    page.screenshot(path=filename, full_page=True)
    return filename


def main():
    print("=" * 80)
    print("COMPREHENSIVE BROWSER QA")
    print("=" * 80)
    print(f"Target URL: {URL}")
    print(f"Pages: {len(pages)}")
    print(f"Viewports: {len(viewports)}")
    print(f"Total combinations: {len(pages) * len(viewports)}")
    print(f"Screenshots directory: {SCREENSHOT_DIR}")
    print("=" * 80)
    print()

    all_results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for page_name, page_path in pages:
            for viewport in viewports:
                print(f"[{len(all_results) + 1:02d}/{len(pages) * len(viewports)}] Testing {page_path or '/'} @ {viewport['width']}x{viewport['height']}")

                page = browser.new_page(viewport=viewport)
                try:
                    page.goto(f"{URL}{page_path}", wait_until="networkidle")
                    page.wait_for_load_state("networkidle")
                    result = run_checks(page, page_name, viewport)
                    screenshot_path = take_screenshot(page, page_name, viewport)
                    result["screenshot"] = screenshot_path
                    all_results.append(result)
                finally:
                    page.close()

        browser.close()

    print()
    print("=" * 80)
    print("RENDERING FAILURE SUMMARY")
    print("=" * 80)

    total_failures = 0
    for result in all_results:
        failures = result["failures"]
        if failures:
            total_failures += len(failures)
            print(f"\n{result['url']} @ {result['viewport']}")
            print(f"  Screenshot: {result['screenshot']}")
            for failure in failures:
                if failure["type"] == "font":
                    print(f"  - FONT: {failure['message']} (font: {failure.get('font')})")
                elif failure["type"] == "link_styling":
                    print(f"  - LINK #{failure['link_index']} '{failure['link_text']}': " + ", ".join(failure["issues"]))
                    print(f"    color: {failure.get('color')}, text-decoration: {failure.get('textDecoration')}")
                elif failure["type"] == "console":
                    print(f"  - CONSOLE: {failure['message']}")
                    for err in failure["errors"]:
                        print(f"    [ERROR] {err}")

    print()
    print(f"Total rendering failures: {total_failures}")
    print(f"Total combinations tested: {len(all_results)}")
    print(f"Combinations with failures: {sum(1 for r in all_results if r['failures'])}")
    print("=" * 80)

    with open(os.path.join(SCREENSHOT_DIR, "qa-results.json"), "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=2)

    print(f"\nDetailed results saved to: {os.path.join(SCREENSHOT_DIR, 'qa-results.json')}")


if __name__ == "__main__":
    main()

