from pathlib import Path
p=Path('data/ap-physics-c-em.js')
lines=p.read_text().splitlines()
ids=['em-set-u8-02','em-set-u9-02','em-set-u10-03','em-set-u11-03','em-set-u12-03','em-set-u13-02']
seen={x:0 for x in ids}
out=[]
for line in lines:
    for qid in ids:
        if line.startswith(f'add("{qid}"'):
            line='addSet'+line[3:]
            seen[qid]+=1
    out.append(line)
if any(v!=1 for v in seen.values()): raise SystemExit('group repair counts '+repr(seen))
p.write_text('\n'.join(out)+'\n')
