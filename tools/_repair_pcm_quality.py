from pathlib import Path
import json, re

p=Path('data/ap-physics-c-mechanics.js')
lines=p.read_text().splitlines()

suffix={
'pcm-1.2-02':' This is the instantaneous second derivative of position, not the average acceleration over the interval.',
'pcm-2.10-02':' The radial acceleration therefore points toward the center and has the stated magnitude at that instant.',
'pcm-3.5-01':' The watt is one joule per second, so the quotient directly gives the rate at which the motor transfers energy.',
'pcm-3.5-02':' The dot product also shows that only the component of force parallel to the velocity contributes to power.',
'pcm-5.1-01':' The constant-acceleration relation is the rotational analogue of v=v0+at for translational motion.',
'pcm-5.6-01':' The result follows from dividing the net torque by the body’s rotational inertia about the specified axis.',
'pcm-5.6-03':' This inverse dependence is why a body that is harder to rotate responds less to the same applied torque.',
'pcm-6.1-01':' The units kg·m²·rad²/s² reduce to joules because radians are dimensionless in this energy expression.',
'pcm-6.4-03':' The product Iω must remain fixed, so the decrease in rotational inertia is exactly offset by a larger angular speed.',
'pcm-6.5-01':' The no-slip condition equates the rim’s tangential speed relative to the center with the center-of-mass speed.',
'pcm-6.6-01':' The orbiting mass cancels, showing that circular-orbit speed at a given radius does not depend on satellite mass.',
'pcm-6.6-02':' The negative sign indicates a bound orbit, with the magnitude equal to one half of the gravitational potential-energy magnitude.',
'pcm-7.1-02':' Its solutions are sinusoidal because the acceleration is proportional to displacement and directed oppositely.',
'pcm-7.2-01':' The square-root dependence follows from balancing the spring restoring force against the oscillator’s inertial response.',
'pcm-7.2-02':' Thus a stiffer spring increases angular frequency while a larger oscillating mass decreases it.',
'pcm-7.2-03':' The spring constant is unchanged, so only the square-root mass factor changes between the two oscillators.',
'pcm-7.4-01':' At that turning point the oscillator is momentarily at rest, so none of the mechanical energy is kinetic.',
'pcm-7.4-02':' This quadratic amplitude dependence follows directly from the spring potential energy at a turning point.',
'pcm-set-u1-02':' Differentiation is required because the question asks for instantaneous velocity rather than an interval-average slope.',
'pcm-set-u2-02':' Substituting the new speed into the fitted square-law model extends the same relationship supported by all four trials.',
'pcm-set-u5-01':' The same ratio in every trial independently supports one fixed rotational inertia for the rotor.',
'pcm-set-u5-03':' Using the experimentally inferred inertia in α=τ/I gives the prediction for a torque not explicitly listed in the table.',
'pcm-set-u6-03':' This extrapolation uses the same inverse-square-root dependence that fits every normalized orbit in the table.',
}

# JSON string-token matcher. In every p(...) line token 0 is id and token 10 is rationale.
tok_re=re.compile(r'"(?:\\.|[^"\\])*"')
new=[]
for line in lines:
    if line.lstrip().startswith('p("pcm-'):
        toks=list(tok_re.finditer(line))
        if len(toks) >= 11:
            qid=json.loads(toks[0].group())
            # Normalize every student-facing string (stem, four raw options, rationale).
            replacements=[]
            for idx in range(5,11):
                m=toks[idx]
                text=json.loads(m.group())
                text=re.sub(r'(?<=[A-Za-z])_(?=[A-Za-z])','',text)
                replacements.append((m.start(),m.end(),json.dumps(text,ensure_ascii=False)))
            for a,b,r in reversed(replacements): line=line[:a]+r+line[b:]
            # Re-tokenize after normalization and enrich any short rationale by id.
            toks=list(tok_re.finditer(line))
            if qid in suffix:
                m=toks[10]
                text=json.loads(m.group())+suffix[qid]
                line=line[:m.start()]+json.dumps(text,ensure_ascii=False)+line[m.end():]
            if qid=='pcm-2.3-03':
                line=line.replace('"One is always noncontact"','"One is a noncontact force"')
                line=line.replace('"Their magnitudes are only approximately equal"','"Their magnitudes are approximately equal but not identical"')
    new.append(line)
p.write_text('\n'.join(new)+'\n')
