import re
with open(r'C:\Users\Shivam\.gemini\antigravity\brain\691e5338-da67-4d1e-ac82-9488002db7c5\.system_generated\steps\147\content.md', 'r', encoding='utf-8') as f:
    text = f.read()
    links = set(re.findall(r'https://framerusercontent\.com/[^\s\"\'\>]+', text))
    for link in links:
        print(link)
