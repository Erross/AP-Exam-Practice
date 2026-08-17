from pathlib import Path

p = Path('data/ap-physics-c-em.js')
s = p.read_text(encoding='utf-8')
repairs = {
'''add("em-12.3-02","U12","12.3","Magnetic Fields of Current-Carrying Wires and the Biot-Savart Law","2.B","A circular loop of radius 0.20 m carries 4.0 A. What is the magnetic-field magnitude at its center?","1.26×10⁻⁵ T","2.51×10⁻⁵ T","4.0×10⁻⁶ T","1.00×10⁻⁵ T","For one circular loop, B at center = μ₀I/(2R)=(4π×10⁻⁷)(4.0)/(0.40)≈1.26×10⁻⁵ T.");''':
'''add("em-12.3-02","U12","12.3","Magnetic Fields of Current-Carrying Wires and the Biot-Savart Law","2.B","A circular loop of radius 0.20 m carries 4.0 A. What is the magnetic-field magnitude at its center?","1.26×10⁻⁵ T","2.51×10⁻⁵ T","4.0×10⁻⁶ T","1.00×10⁻⁵ T","For one circular loop, B at center = μ₀I/(2R)=(4π×10⁻⁷)(4.0)/(0.40)≈1.26×10⁻⁵ T. All current elements contribute in the same axial direction at the center.");''',
'''add("em-12.4-02","U12","12.4","Ampère's Law","2.B","An ideal long solenoid has 800 turns per meter and carries 2.0 A. What is the magnetic-field magnitude well inside it?","2.01×10⁻³ T","1.01×10⁻³ T","4.02×10⁻³ T","6.37×10⁻⁴ T","For an ideal long solenoid, Ampère's law gives B=μ₀nI=(4π×10⁻⁷)(800)(2.0)≈2.01×10⁻³ T.");''':
'''add("em-12.4-02","U12","12.4","Ampère's Law","2.B","An ideal long solenoid has 800 turns per meter and carries 2.0 A. What is the magnetic-field magnitude well inside it?","2.01×10⁻³ T","1.01×10⁻³ T","4.02×10⁻³ T","6.37×10⁻⁴ T","For an ideal long solenoid, Ampère's law gives B=μ₀nI=(4π×10⁻⁷)(800)(2.0)≈2.01×10⁻³ T. The long-solenoid approximation makes the interior field nearly uniform and the exterior field negligible.");'''
}
for old,new in repairs.items():
    if s.count(old) != 1:
        raise SystemExit(f'expected source exactly once; found {s.count(old)}')
    s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
print('repaired two E&M rationales')
