from pathlib import Path
import json, re
p=Path('data/ap-physics-c-mechanics.js')
lines=p.read_text().splitlines()
tok_re=re.compile(r'"(?:\\.|[^"\\])*"')
extra={
  'pcm-2.10-01':' This inward resultant is what produces the required radial acceleration toward the circle’s center.',
  'pcm-6.4-02':' The larger final angular speed exactly compensates for the threefold reduction in rotational inertia.'
}
out=[]
for line in lines:
    if line.lstrip().startswith('p("pcm-'):
        toks=list(tok_re.finditer(line))
        if len(toks)>=11:
            qid=json.loads(toks[0].group())
            if qid in extra:
                m=toks[10]
                rationale=json.loads(m.group())
                if len(rationale)<90:
                    line=line[:m.start()]+json.dumps(rationale+extra[qid],ensure_ascii=False)+line[m.end():]
            if qid=='pcm-4.3-02':
                toks=list(tok_re.finditer(line))
                # raw options are string tokens 6..9; correct is token 7/raw index 1.
                replacements={
                  6:'When the system’s total kinetic energy is unchanged',
                  8:'When internal interaction forces are negligible',
                  9:'When a collision between system objects is elastic'
                }
                for idx,text in sorted(replacements.items(), reverse=True):
                    m=toks[idx]
                    line=line[:m.start()]+json.dumps(text,ensure_ascii=False)+line[m.end():]
    out.append(line)
p.write_text('\n'.join(out)+'\n')
