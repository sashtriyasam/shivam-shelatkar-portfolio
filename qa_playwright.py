import os
from playwright.sync_api import sync_playwright

BASE_DIR = "D:/TESTWEB"
SCREENSHOT_DIR = os.path.join(BASE_DIR, "qa-screenshots")
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

global_console_errors = []


def navigate_and_screenshot(path, name, viewport):
    page = browser.new_page(viewport=viewport)
    page.goto(f"{URL}{path}", wait_until="networkidle")
    page.wait_for_load_state("networkidle")
    page_errors = []

    def on_console(msg):
        if msg.type == "error":
            page_errors.append(f"[{msg.type}] {msg.text}")

    page.on("console", on_console)
    filename = os.path.join(SCREENSHOT_DIR, f"{name}_{viewport['width']}x{viewport['height']}.png")
    page.screenshot(path=filename, full_page=True)
    page.remove_listener("console", on_console)
    global_console_errors.extend([{"page": name, "error": e} for e in page_errors])
    page.close()


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for path, name in pages:
        for viewport in viewports:
            navigate_and_screenshot(path, name, viewport)

    browser.close()

print(f"\nConsole errors found: {len(global_console_errors)}")
for err in global_console_errors:
    print(f"  - {err['page']}: {err['error']}")
