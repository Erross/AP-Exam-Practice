from pathlib import Path
import json, urllib.parse, urllib.request, time, re
from io import BytesIO
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
A=ROOT/'assets'/'ap-art-history'
UA='AP-Exam-Practice/1.0 educational static site'
EXACT={
 '008-stonehenge':'File:Stonehenge showing lintels.jpg',
 '052-hagia-sophia':'File:HagiaSophiaDomeInside.jpg',
 '060-chartres':'File:Chartres Cathédrale Notre-Dame de Chartres Innen Langhaus Nordost 2.jpg',
}

def clean(v): return re.sub(r'<[^>]+>','',str((v or {}).get('value',''))).strip()
def api(title):
 q=urllib.parse.urlencode({'action':'query','format':'json','titles':title,'prop':'imageinfo','iiprop':'url|mime|extmetadata','iiurlwidth':'900','origin':'*'})
 req=urllib.request.Request('https://commons.wikimedia.org/w/api.php?'+q,headers={'User-Agent':UA})
 with urllib.request.urlopen(req,timeout=30) as r: data=json.load(r)
 page=next(iter(data['query']['pages'].values())); info=page['imageinfo'][0]; return page,info,info.get('extmetadata',{})

def save(key,title):
 page,info,meta=api(title); time.sleep(1.5)
 url=info.get('thumburl') or info['url']
 req=urllib.request.Request(url,headers={'User-Agent':UA,'Referer':'https://commons.wikimedia.org/'})
 for wait in (0,3,6,12,24):
  if wait: time.sleep(wait)
  try:
   with urllib.request.urlopen(req,timeout=60) as r: raw=r.read()
   break
  except Exception:
   if wait==24: raise
 img=Image.open(BytesIO(raw)).convert('RGB'); img.thumbnail((900,9000)); img.save(A/f'{key}.jpg','JPEG',quality=84,optimize=True,progressive=True)
 return {'key':key,'query':title,'commonsTitle':page['title'],'sourceUrl':info.get('descriptionurl') or info.get('url'),'downloadUrl':url,'license':clean(meta.get('LicenseShortName')) or clean(meta.get('UsageTerms')),'licenseUrl':clean(meta.get('LicenseUrl')),'artist':clean(meta.get('Artist')),'credit':clean(meta.get('Credit')),'originalDescription':clean(meta.get('ImageDescription'))}

manifest=json.loads((A/'SOURCES.json').read_text())
by={x['key']:x for x in manifest}
for key,title in EXACT.items(): by[key]=save(key,title)
by.pop('249-maxxi',None)
(A/'249-maxxi.jpg').unlink(missing_ok=True)
(A/'SOURCES.json').write_text(json.dumps([by[k] for k in sorted(by)],indent=2,ensure_ascii=False)+'\n')

# MAXXI stays in the knowledge bank but no longer acts as a visual stimulus.
p=ROOT/'data'/'ap-art-history-u10.js'; s=p.read_text();
s=s.replace(', imageKey:"249-maxxi", alt:"Zaha Hadid\'s MAXXI museum with sweeping concrete walls, ramps, and intersecting circulation paths"','')
p.write_text(s)
