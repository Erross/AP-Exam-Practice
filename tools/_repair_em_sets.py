from pathlib import Path
p=Path('data/ap-physics-c-em.js')
lines=p.read_text().splitlines()
repls={
'em-set-u8-02':'add("em-set-u8-02","U8","8.3","Electric Fields","2.C","Compared with the field magnitude at r = 2 m, the field magnitude at r = 4 m would be","one fourth as large","one half as large","twice as large","four times as large","The table supports E proportional to 1/r². Doubling the distance from 2 m to 4 m therefore reduces the field magnitude by a factor of 2² = 4, so it is one fourth as large.","em-set-u8",EM_SET_U8);',
'em-set-u9-02':'add("em-set-u9-02","U9","9.2","Electric Potential","2.C","Compared with the potential measured at r = 1 m, the potential measured at r = 2 m is","one half as large","one fourth as large","twice as large","four times as large","The table shows 120 V at 1 m and 60 V at 2 m, so doubling the distance halves the potential. This comparison is consistent with the point-charge relation V proportional to 1/r.","em-set-u9",EM_SET_U9);',
'em-set-u10-03':'add("em-set-u10-03","U10","10.3","Capacitors","2.C","Compared with the stored charge at 1 V, the stored charge at 5 V is","five times as large","twenty-five times as large","one fifth as large","four times as large","The table gives 4 μC at 1 V and 20 μC at 5 V. Their ratio is 20/4 = 5, so the stored charge is five times as large when the voltage is five times as large.","em-set-u10",EM_SET_U10);',
'em-set-u11-03':'add("em-set-u11-03","U11","11.4","Electric Power","2.C","Compared with the power dissipated at 2 V, the power dissipated at 10 V is","twenty-five times as large","five times as large","ten times as large","one fifth as large","At 2 V the table gives I = 0.5 A, so P = 1 W. At 10 V it gives I = 2.5 A, so P = 25 W. The second power is therefore twenty-five times the first.","em-set-u11",EM_SET_U11);',
'em-set-u12-03':'add("em-set-u12-03","U12","12.2","Magnetism and Moving Charges","2.C","Compared with the magnetic-force magnitude at 2 m/s, the magnitude at 6 m/s is","three times as large","nine times as large","one third as large","twice as large","The table gives 6 μN at 2 m/s and 18 μN at 6 m/s. The ratio 18/6 = 3, so tripling the speed produces three times the magnetic-force magnitude under these conditions.","em-set-u12",EM_SET_U12);',
'em-set-u13-02':'add("em-set-u13-02","U13","13.2","Electromagnetic Induction","2.C","Compared with the induced-emf magnitude when |dΦB/dt| = 0.5 Wb/s, the magnitude when |dΦB/dt| = 2.5 Wb/s is","five times as large","twenty-five times as large","one fifth as large","two times as large","The table gives 0.5 V for 0.5 Wb/s and 2.5 V for 2.5 Wb/s. Their ratio is 2.5/0.5 = 5, so the induced-emf magnitude is five times as large.","em-set-u13",EM_SET_U13);'
}
seen={k:0 for k in repls}
out=[]
for line in lines:
    replaced=False
    for qid,new in repls.items():
        if f'"{qid}"' in line:
            seen[qid]+=1; out.append(new); replaced=True; break
    if not replaced:
        if 'add("em-8.6-02"' in line:
            line=line.replace('"E = Qr/(4πε₀R²)"','"E = Qr²/(4πε₀R⁴)"')
        out.append(line)
if any(v!=1 for v in seen.values()): raise SystemExit('set target counts '+repr(seen))
p.write_text('\n'.join(out)+'\n')
