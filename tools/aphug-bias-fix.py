from pathlib import Path
p=Path('data/ap-human-geography-finalize.js')
s=p.read_text()
s=s.replace('"A qualitative interview transcript from one resident","A reference map showing only named locations","A landscape photograph without numerical attributes"','"A qualitative interview transcript describing one resident\'s geographic experience","A reference map displaying named locations and transportation features","A landscape image showing visible land-use and settlement features"')
s=s.replace('"A numerical time series measuring annual change","A table of demographic rates for several countries","A mathematical model with no geographic context"','"A numerical time series documenting annual change in a geographic indicator","A demographic table comparing population rates among several geographic areas","A mathematical model describing a relationship without a geographic source"')
p.write_text(s)
