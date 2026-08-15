#!/usr/bin/env python3
"""tools/cp437_to_utf8.py - Convert CP437 encoded files from URLs to UTF-8 text.

Usage:
    python3 tools/cp437_to_utf8.py <url> [output_file]

Examples:
    python3 tools/cp437_to_utf8.py https://www.moonweb.org/files/pc/KDS/kosmos.txt
    python3 tools/cp437_to_utf8.py https://www.moonweb.org/files/pc/KDS/FILES.BBS src/data/kds-files-bbs.txt

If no output_file is given, prints to stdout.
"""

import sys
import urllib.request
import urllib.error
from pathlib import Path


def fetch_cp437(url: str) -> str:
    """Fetch a URL and decode the response body as CP437."""
    req = urllib.request.Request(url, headers={"User-Agent": "28k8-cp437-converter/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        raw = resp.read()
    return raw.decode("cp437", errors="replace")


def main():
    if len(sys.argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]
    output = sys.argv[2] if len(sys.argv) > 2 else None

    try:
        text = fetch_cp437(url)
    except (urllib.error.URLError, OSError) as exc:
        print(f"Error fetching {url}: {exc}", file=sys.stderr)
        sys.exit(1)

    if output:
        out_path = Path(output)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(text, encoding="utf-8")
        print(f"Wrote {len(text)} chars to {output}", file=sys.stderr)
    else:
        print(text)


if __name__ == "__main__":
    main()
