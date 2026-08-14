#!/usr/bin/env python3
from __future__ import annotations
import json, os, re, sys, time, urllib.parse, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "ap-art-history"
ASSET_DIR.mkdir(parents=True, exist_ok=True)

QUERIES = {
"005-beaker-ibex":"Beaker ibex Susa Louvre",
"008-stonehenge":"Stonehenge",
"013-narmer":"Narmer Palette",
"017-giza":"Great Pyramids Giza",
"019-hammurabi":"Code of Hammurabi stele Louvre",
"035-parthenon":"Parthenon Athens",
"043-augustus":"Augustus Prima Porta",
"046-pantheon":"Pantheon Rome interior dome",
"052-hagia-sophia":"Hagia Sophia interior dome",
"055-lindisfarne":"Lindisfarne Gospels carpet page",
"056-cordoba":"Great Mosque Cordoba interior arches",
"060-chartres":"Chartres Cathedral interior",
"068-arnolfini":"Arnolfini Portrait Jan van Eyck",
"072-birth-venus":"Birth of Venus Botticelli",
"076-school-athens":"School of Athens Raphael",
"091-las-meninas":"Las Meninas Velazquez",
"100-orrery":"Philosopher Lecture Orrery Joseph Wright Derby",
"101-swing":"The Swing Fragonard",
"103-horatii":"Oath of the Horatii David",
"109-third-may":"Third of May 1808 Goya",
"115-olympia":"Olympia Manet",
"120-starry-night":"Starry Night van Gogh",
"125-sainte-victoire":"Mont Sainte-Victoire Cezanne",
"127-steerage":"The Steerage Stieglitz",
"156-serpent-mound":"Great Serpent Mound aerial",
"157-templo-mayor":"Templo Mayor Mexico City",
"161-machu-picchu":"Machu Picchu",
"167-great-zimbabwe":"Great Zimbabwe walls",
"168-djenne":"Great Mosque Djenne",
"185-dome-rock":"Dome of the Rock Jerusalem",
"191-ardabil":"Ardabil Carpet",
"192-sanchi":"Great Stupa Sanchi",
"199-angkor-wat":"Angkor Wat",
"209-taj-mahal":"Taj Mahal",
"211-great-wave":"Great Wave off Kanagawa Hokusai",
"214-moai":"Moai Ahu Tongariki",
"221-navigation-chart":"Marshall Islands stick chart navigation",
"240-bilbao":"Guggenheim Museum Bilbao exterior",
"249-maxxi":"MAXXI museum Rome exterior",
"unk-venus-milo":"Venus de Milo Louvre",
"unk-nefertiti":"Nefertiti bust",
"unk-mona-lisa":"Mona Lisa Leonardo da Vinci",
"unk-girl-pearl":"Girl with a Pearl Earring Vermeer",
"unk-amiens":"Amiens Cathedral west facade",
"unk-death-marat":"Death of Marat David",
"unk-liberty":"Liberty Leading the People Delacroix",
"unk-raft":"Raft of the Medusa Gericault",
"unk-impression-sunrise":"Impression Sunrise Monet",
"unk-water-lilies":"Water Lilies Monet",
}

ACCEPT = ("public domain", "cc0", "cc by", "cc-by", "cc by-sa", "cc-by-sa", "creative commons attribution")
UA = "AP-Exam-Practice/1.0 (educational static site; github.com/Erross/AP-Exam-Practice)"

def open_with_backoff(req, timeout):
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

def text_meta(meta, key):
    v = (meta or {}).get(key) or {}
    return re.sub(r"<[^>]+>", "", str(v.get("value", ""))).strip()

def acceptable(meta):
    combined = " ".join(text_meta(meta, k) for k in ("LicenseShortName","UsageTerms","Copyrighted")).lower()
    return any(token in combined for token in ACCEPT)

def commons_candidate(query):
    params = {
        "action":"query","format":"json","generator":"search","gsrnamespace":"6",
        "gsrsearch":query,"gsrlimit":"15","prop":"imageinfo",
        "iiprop":"url|mime|extmetadata","iiurlwidth":"900","origin":"*",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    data = get_json(url)
    pages = list((data.get("query") or {}).get("pages", {}).values())
    pages.sort(key=lambda p: p.get("index", 999))
    for page in pages:
        info = (page.get("imageinfo") or [{}])[0]
        meta = info.get("extmetadata") or {}
        mime = info.get("mime", "")
        if not mime.startswith("image/") or not acceptable(meta):
            continue
        thumb = info.get("thumburl") or info.get("url")
        if not thumb:
            continue
        return page, info, meta, thumb
    raise RuntimeError(f"No clearly reusable Wikimedia Commons image found for: {query}")

def materialize_assets():
    manifest = []
    for key, query in QUERIES.items():
        out = ASSET_DIR / f"{key}.jpg"
        page, info, meta, url = commons_candidate(query)
        raw, ctype = fetch_bytes(url)
        # Keep the bank path stable as .jpg. Pillow is installed by the workflow.
        from PIL import Image
        from io import BytesIO
        img = Image.open(BytesIO(raw)).convert("RGB")
        img.thumbnail((900, 9000))
        img.save(out, "JPEG", quality=84, optimize=True, progressive=True)
        manifest.append({
            "key": key,
            "query": query,
            "commonsTitle": page.get("title"),
            "sourceUrl": info.get("descriptionurl") or info.get("url"),
            "downloadUrl": url,
            "license": text_meta(meta, "LicenseShortName") or text_meta(meta, "UsageTerms"),
            "licenseUrl": text_meta(meta, "LicenseUrl"),
            "artist": text_meta(meta, "Artist"),
            "credit": text_meta(meta, "Credit"),
            "originalDescription": text_meta(meta, "ImageDescription"),
        })
        print(f"{key}: {page.get('title')} — {manifest[-1]['license']}")
    (ASSET_DIR / "SOURCES.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def patch_index():
    path = ROOT / "index.html"
    s = path.read_text(encoding="utf-8")
    marker = '<script src="data/ap-art-history.js"></script>'
    layers = "\n".join([marker] + [f'<script src="data/ap-art-history-u{i}.js"></script>' for i in range(1,11)] + [
        '<script src="data/ap-art-history-unknowns.js"></script>',
        '<script src="data/ap-art-history-finalize.js"></script>',
    ])
    if "ap-art-history-u1.js" not in s:
        s = s.replace(marker, layers)
    path.write_text(s, encoding="utf-8")


def patch_subjects():
    path = ROOT / "js" / "subjects.js"
    s = path.read_text(encoding="utf-8")
    start = s.index('  {\n    id: "ap-art-history",')
    end = s.index('  {\n    id: "ap-music-theory",', start)
    block = '''  {
    id: "ap-art-history",
    name: "AP Art History",
    category: "Arts",
    tier: 1,
    // VERIFIED 2026-08-13 against current AP Central course and exam pages.
    // Section I: 80 MCQs in 60 minutes, 50% of score; 2-3 question image sets
    // plus individual questions using works both within and beyond the prescribed image set.
    mcqCount: 80,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: null,
    units: [
      { id:"U1", name:"Global Prehistory, 30,000–500 BCE", examWeight:0.04, examWeightRange:[0.04,0.04] },
      { id:"U2", name:"Ancient Mediterranean, 3500 BCE–300 CE", examWeight:0.15, examWeightRange:[0.15,0.15] },
      { id:"U3", name:"Early Europe and Colonial Americas, 200–1750 CE", examWeight:0.21, examWeightRange:[0.21,0.21] },
      { id:"U4", name:"Later Europe and Americas, 1750–1980 CE", examWeight:0.21, examWeightRange:[0.21,0.21] },
      { id:"U5", name:"Indigenous Americas, 1000 BCE–1980 CE", examWeight:0.06, examWeightRange:[0.06,0.06] },
      { id:"U6", name:"Africa, 1100–1980 CE", examWeight:0.06, examWeightRange:[0.06,0.06] },
      { id:"U7", name:"West and Central Asia, 500 BCE–1980 CE", examWeight:0.04, examWeightRange:[0.04,0.04] },
      { id:"U8", name:"South, East, and Southeast Asia, 300 BCE–1980 CE", examWeight:0.08, examWeightRange:[0.08,0.08] },
      { id:"U9", name:"The Pacific, 700–1980 CE", examWeight:0.04, examWeightRange:[0.04,0.04] },
      { id:"U10", name:"Global Contemporary, 1980 CE to Present", examWeight:0.11, examWeightRange:[0.11,0.11] },
    ],
    skillCountRanges: { "1":[12,15], "2":[23,25], "3":[9,10], "4":[16,20], "5":[5,6], "6":[5,6], "7":[5,6] },
    stimulusSetRange: [17,21],
    constraintDrawAttempts: 50000,
    dataVar: "QUESTIONS_AP_ART_HISTORY",
  },
'''
    s = s[:start] + block + s[end:]
    path.write_text(s, encoding="utf-8")

if __name__ == "__main__":
    patch_index(); patch_subjects(); materialize_assets()
