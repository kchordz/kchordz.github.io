import re
import json

with open("index.html", "r") as f:
    html = f.read()

# We need to find the exact keys
match = re.search(r'const projects = (\[.*\]);', html, re.DOTALL)
if match:
    data = json.loads(match.group(1))
    for p in data:
        print(f"{p['key']} -> {p['title']}")
