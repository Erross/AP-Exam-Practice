from pathlib import Path
p=Path('tools/subject-release-audit.js')
s=p.read_text()
old='''    const longest = Math.max(...lengths);\n    const correctLength = lengths[key];\n    if (correctLength === longest) amongLongest++;\n    if (correctLength === longest && lengths.filter((length) => length === longest).length === 1) uniqueLongest++;'''
new='''    const longest = Math.max(...lengths);\n    const correctLength = lengths[key];\n    const longestCount = lengths.filter((length) => length === longest).length;\n    // A four-way length tie carries zero answer-position information. Keep\n    // two- and three-way longest ties in the conservative among-longest metric,\n    // but do not count a tie shared by every option as an exploitable cue.\n    if (correctLength === longest && longestCount < lengths.length) amongLongest++;\n    if (correctLength === longest && longestCount === 1) uniqueLongest++;'''
if old not in s: raise SystemExit('answer-length metric block not found')
s=s.replace(old,new)
s=s.replace('`Answer pattern: uniquely-longest ${(100 * result.content.uniqueLongestShare).toFixed(1)}%; among-longest ${(100 * result.content.amongLongestShare).toFixed(1)}%; correct ${result.content.correctAverage.toFixed(2)} words vs distractors ${result.content.distractorAverage.toFixed(2)}.`',
'''`Answer pattern: uniquely-longest ${(100 * result.content.uniqueLongestShare).toFixed(1)}%; exploitable among-longest ${(100 * result.content.amongLongestShare).toFixed(1)}% (four-way ties excluded); correct ${result.content.correctAverage.toFixed(2)} words vs distractors ${result.content.distractorAverage.toFixed(2)}.`''')
p.write_text(s)
