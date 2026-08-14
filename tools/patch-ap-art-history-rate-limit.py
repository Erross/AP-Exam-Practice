from pathlib import Path
p=Path('tools/materialize-ap-art-history.py')
s=p.read_text()
s=s.replace('import json, os, re, sys, urllib.parse, urllib.request', 'import json, os, re, sys, time, urllib.parse, urllib.request, urllib.error')
s=s.replace('def get_json(url: str):\n    req = urllib.request.Request(url, headers={"User-Agent": UA})\n    with urllib.request.urlopen(req, timeout=30) as r:\n        return json.load(r)\n\ndef fetch_bytes(url: str):\n    req = urllib.request.Request(url, headers={"User-Agent": UA})\n    with urllib.request.urlopen(req, timeout=60) as r:\n        return r.read(), r.headers.get_content_type()\n', '''def open_with_backoff(req, timeout):
    for attempt in range(7):
        try:
            return urllib.request.urlopen(req, timeout=timeout)
        except urllib.error.HTTPError as exc:
            if exc.code != 429 or attempt == 6:
                raise
            wait = min(60, 3 * (2 ** attempt))
            print(f"Wikimedia rate limit; sleeping {wait}s", flush=True)
            time.sleep(wait)
    raise RuntimeError("unreachable")

def get_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with open_with_backoff(req, 30) as r:
        data = json.load(r)
    time.sleep(1.25)
    return data

def fetch_bytes(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer":"https://commons.wikimedia.org/"})
    with open_with_backoff(req, 60) as r:
        data, ctype = r.read(), r.headers.get_content_type()
    time.sleep(1.25)
    return data, ctype
''')
s=s.replace('    for key, query in QUERIES.items():\n        page, info, meta, url = commons_candidate(query)', '    for key, query in QUERIES.items():\n        out = ASSET_DIR / f"{key}.jpg"\n        page, info, meta, url = commons_candidate(query)')
s=s.replace('        out = ASSET_DIR / f"{key}.jpg"\n        img.save(out, "JPEG", quality=84, optimize=True, progressive=True)', '        img.save(out, "JPEG", quality=84, optimize=True, progressive=True)')
p.write_text(s)
