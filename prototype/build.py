"""Inline the brand assets into the prototype page: python build.py"""
import json, pathlib
here = pathlib.Path(__file__).parent
assets = json.loads((here / "assets.json").read_text())
html = (here / "home.src.html").read_text(encoding="utf-8")
for key, value in assets.items():
    html = html.replace("{{%s}}" % key, value)
(here / "kreatekno-home.html").write_text(html, encoding="utf-8")
print("wrote kreatekno-home.html", len(html) // 1024, "KB")
