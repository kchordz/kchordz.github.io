import re
import json

with open("index.html", "r") as f:
    html = f.read()

match = re.search(r'const projects = (\[.*?\]);', html, re.DOTALL)
if match:
    projects_json_str = match.group(1)
    projects = json.loads(projects_json_str)

    for p in projects:
        print(f"Key: {p.get('key')}, Title: {p.get('title')}")
else:
    print("Could not find projects array")
