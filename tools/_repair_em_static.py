from pathlib import Path
p=Path('data/ap-physics-c-em.js')
s=p.read_text()
repls={
'E = Qr²/(4πε₀R⁴)':'E = Qr/(4πε₀R²)',
'Charge is destroyed in every resistor and recreated by the battery':'Resistors consume charge while the battery supplies replacement charge',
'The current must be identical in every branch of the circuit':'Branch currents determine the potential independently of the path taken',
'Magnetic-field lines can terminate only in empty space':'Magnetic-field lines terminate when the external field becomes weak',
'Magnetic fields exist only when electric current is visible':'Magnetic-field lines may stop at the physical surface of a magnet',
'The loop must attract every approaching magnetic pole':'The loop attracts the approaching pole because induced current seeks larger flux',
'The induced current always flows clockwise':'The induced current flows clockwise for an approaching north pole',
'I=nqAv_d':'I=nqAvdrift',
'v_d is inversely':'vdrift is inversely',
'B_center=μ₀I/(2R)':'B at center = μ₀I/(2R)',
'I_enc':'Ienc',
'Q_enc':'Qenc',
}
for old,new in repls.items():
    if old not in s:
        raise SystemExit(f'missing repair target: {old}')
    s=s.replace(old,new)
p.write_text(s)
