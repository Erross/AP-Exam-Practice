from pathlib import Path

path = Path('data/ap-physics-c-mechanics.js')
text = path.read_text()
repls = {
'"Circular motion requires no inward acceleration"': '"Circular motion requires an inward force only when speed changes"',
'"Centripetal force always points outward"': '"Centripetal force is an outward force produced by inertia"',
'"Tension cannot contribute to circular motion"': '"Tension contributes only to tangential acceleration in circular motion"',
'"The smaller ratio eliminates gravity"': '"The smaller rotational inertia ratio produces a larger gravitational force"',
'"Static friction necessarily does positive work"': '"Static friction supplies the missing mechanical energy during the descent"',
'"Mass conservation requires a higher speed"': '"Equal mass requires both objects to have the same translational speed"',
}
for old, new in repls.items():
    if old not in text:
        raise SystemExit(f'missing expected option: {old}')
    text = text.replace(old, new, 1)
path.write_text(text)
