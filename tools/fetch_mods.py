#!/usr/bin/env python3
"""tools/fetch_mods.py - Fetch MOD file metadata from moonweb.org and write to src/data/mods.json.

Run before build:
    python3 tools/fetch_mods.py

The JSON is committed to the repo so the build doesn't depend on the external server.
Re-run to refresh the list if files change on moonweb.org.
"""

import json
import sys
import urllib.request
import urllib.error
from pathlib import Path

API_URL = "https://www.moonweb.org/files/amiga/mods/?info=1"
OUTPUT = Path(__file__).resolve().parent.parent / "src" / "data" / "mods.json"


def fetch_mods():
    req = urllib.request.Request(API_URL, headers={"User-Agent": "28k8-moonweb-build/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())


def extract(file_entry):
    info = file_entry.get("module_info", {})
    return {
        "name": file_entry["name"],
        "title": info.get("title", "").strip() or file_entry["name"],
        "size_human": file_entry.get("size_human", "?"),
        "channels": info.get("channels", 0),
        "sample_count": info.get("sample_count", 0),
        "modified": file_entry.get("modified", ""),
        "url": file_entry.get("url", ""),
    }


def main():
    try:
        data = fetch_mods()
    except (urllib.error.URLError, OSError) as exc:
        print(f"Error fetching {API_URL}: {exc}", file=sys.stderr)
        sys.exit(1)

    files = data.get("files", [])
    mods = sorted((extract(f) for f in files), key=lambda m: m["name"].lower())

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(mods, indent=2) + "\n")
    print(f"Wrote {len(mods)} MODs to {OUTPUT.relative_to(OUTPUT.parent.parent.parent)}")


if __name__ == "__main__":
    main()
