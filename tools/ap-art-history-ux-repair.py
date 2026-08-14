from pathlib import Path

# Visual sources need an obvious inspection path without leaving the timed attempt.
p=Path('js/app.js'); s=p.read_text()
old='''    wrap.appendChild(\n      el("img", {\n        className: "stimulus-image",\n        attrs: { src: stim.image, alt: stim.alt || stim.description || "" },\n      })\n    );\n    if (stim.description) {'''
new='''    wrap.appendChild(\n      el("img", {\n        className: "stimulus-image",\n        attrs: { src: stim.image, alt: stim.alt || stim.description || "" },\n      })\n    );\n    if (stim.image) {\n      wrap.appendChild(\n        el("a", {\n          className: "stimulus-image-link",\n          text: "View larger image ↗",\n          attrs: { href: stim.image, target: "_blank", rel: "noopener" },\n        })\n      );\n    }\n    if (stim.description) {'''
if old not in s: raise SystemExit('app visual render block not found')
s=s.replace(old,new); p.write_text(s)

p=Path('style.css'); s=p.read_text()
needle='''.stimulus-image {\n  display: block;\n  width: min(100%, 760px);\n  height: auto;\n  margin: 1rem auto;\n  border: 1px solid var(--border);\n  border-radius: 0.5rem;\n  background: #fff;\n}\n'''
addon=needle+'''.stimulus-image-link {\n  display: block;\n  width: fit-content;\n  margin: -0.4rem auto 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 650;\n  color: var(--accent);\n}\n'''
if needle not in s: raise SystemExit('stimulus image css block not found')
s=s.replace(needle,addon); p.write_text(s)

# Surface course-specific notes in the preflight, not only on the catalog card.
p=Path('js/catalog.js'); s=p.read_text()
s=s.replace('''    text(panel, "p", "preflight-full", "subject-total", "");\n    text(panel, "p", "", "results-scope-note", "Your in-progress attempt is saved in this browser session.''','''    text(panel, "p", "preflight-full", "subject-total", "");\n    text(panel, "p", "preflight-note", "results-scope-note", "");\n    text(panel, "p", "", "results-scope-note", "Your in-progress attempt is saved in this browser session.''')
s=s.replace('''    document.getElementById("preflight-full").textContent = `Official full AP exam duration: ${subject.totalExamTimeLabel}`;\n    const parts = document.getElementById("preflight-parts");''','''    document.getElementById("preflight-full").textContent = `Official full AP exam duration: ${subject.totalExamTimeLabel}`;\n    const note = document.getElementById("preflight-note");\n    note.textContent = subject.tierNote || "";\n    note.hidden = !subject.tierNote;\n    const parts = document.getElementById("preflight-parts");''')
p.write_text(s)

p=Path('js/subjects.js'); s=p.read_text()
old='''    calculatorAllowed: false,\n    tierNote: null,\n    units: ['''
new='''    calculatorAllowed: false,\n    tierNote: "Includes image-based question sets and unfamiliar-work visual analysis; use View larger image when you need to inspect detail.",\n    units: ['''
# Only replace the first matching block, which is Art History at the top of the registry.
if old not in s: raise SystemExit('Art History tier note block not found')
s=s.replace(old,new,1); p.write_text(s)
