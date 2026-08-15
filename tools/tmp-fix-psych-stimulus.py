from pathlib import Path
p=Path('data/ap-psychology.js')
s=p.read_text()
old="""    const stimulus=`Synthetic study — ${name}: Group A (n=40) had a mean outcome score of ${a}; Group B (n=40) had a mean outcome score of ${b}. Participants were recruited from one local school. The values are invented for practice.`;"""
new="""    const stimulus={
      type:'quantitative',
      title:`Synthetic psychology study — ${name}`,
      source:'Original AP Exam Practice data; all values and participants are invented for practice.',
      columns:['Group','n','Mean outcome score'],
      rows:[['Group A','40',String(a)],['Group B','40',String(b)]],
      description:'Participants were recruited from one local school; the table reports descriptive group means only.'
    };"""
assert old in s
p.write_text(s.replace(old,new,1))
