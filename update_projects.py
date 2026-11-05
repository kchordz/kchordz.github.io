import re
import json

with open("index.html", "r") as f:
    html = f.read()

# Extract the projects JSON array
match = re.search(r'const projects = (\[.*?\]);', html, re.DOTALL)
if match:
    projects_json_str = match.group(1)
    projects = json.loads(projects_json_str)

    # We want to reorder:
    # 1. OPPO Nigeria ('oppo')
    # 2. Sure Admissions Group ('sureadmissions')
    # 3. Real Estate Designs ('realestate')
    # ...
    # Last: Peaceful Voices Logo Design ('peacefulvoices')

    # Let's map current keys:
    order = [
        "oppo",
        "sureadmissions",
        "realestate",
        "bdglobal", # Let's assume these go in between
        "kiks",
        "random",
        "political",
        "church",
        "peacefulvoices" # wait, let's find the exact key for peaceful voices
    ]

    print([p['title'] for p in projects])
