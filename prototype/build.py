"""Inline the brand assets into the prototype pages: python build.py
home.src.html -> kreatekno-home.html, portfolio.src.html -> kreatekno-portfolio.html"""
import json, pathlib
here = pathlib.Path(__file__).parent
assets = json.loads((here / "assets.json").read_text())
for src in sorted(here.glob("*.src.html")):
    html = src.read_text(encoding="utf-8")
    for key, value in assets.items():
        html = html.replace("{{%s}}" % key, value)
    out = here / ("kreatekno-%s.html" % src.name.split(".")[0])
    out.write_text(html, encoding="utf-8")
    print("wrote", out.name, len(html) // 1024, "KB")
