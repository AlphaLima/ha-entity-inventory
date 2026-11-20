"""Draws the Entity Inventory icon (green base): tab strip on top, entity rows below.
Writes docs/icon.svg and brand/icon.png, icon@2x.png, logo.png. Run: python scripts/make_icon.py"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
GREEN, BLUE, AMBER = "#2E9B3F", "#1E88E5", "#FFB300"
TABS = [(64 + i * 100, 80, 80, 80, 1.0 if i == 0 else 0.45) for i in range(4)]
ROWS = [(255, BLUE), (335, AMBER), (415, "#FFFFFF")]  # top y of a row (height 30), dot colour

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">',
       f'  <rect width="512" height="512" rx="112" fill="{GREEN}"/>']
for x, y, w, h, a in TABS:
    svg.append(f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="20" fill="#fff" fill-opacity="{a}"/>')
for y, c in ROWS:
    svg.append(f'  <circle cx="100" cy="{y + 15}" r="20" fill="{c}"/>')
    svg.append(f'  <rect x="145" y="{y}" width="185" height="30" rx="15" fill="#fff"/>')
    svg.append(f'  <rect x="350" y="{y}" width="98" height="30" rx="15" fill="#fff" fill-opacity="0.55"/>')
svg.append("</svg>")
(ROOT / "docs").mkdir(exist_ok=True)
(ROOT / "docs" / "icon.svg").write_text("\n".join(svg) + "\n", encoding="utf-8")


def draw(size: int) -> Image.Image:
    k = 4 * size / 512  # supersampling
    big = Image.new("RGBA", (size * 4, size * 4), (0, 0, 0, 0))

    def rr(img, box, r, fill, alpha=1.0):
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        col = Image.new("RGBA", (1, 1), fill).getpixel((0, 0))
        ImageDraw.Draw(layer).rounded_rectangle([v * k for v in box], r * k, fill=col[:3] + (int(255 * alpha),))
        img.alpha_composite(layer)

    rr(big, (0, 0, 512, 512), 112, GREEN)
    for x, y, w, h, a in TABS:
        rr(big, (x, y, x + w, y + h), 20, "#FFFFFF", a)
    for y, c in ROWS:
        rr(big, (80, y - 5, 120, y + 35), 20, c)
        rr(big, (145, y, 330, y + 30), 15, "#FFFFFF")
        rr(big, (350, y, 448, y + 30), 15, "#FFFFFF", 0.55)
    return big.resize((size, size), Image.LANCZOS)


brand = ROOT / "custom_components" / "entity_inventory" / "brand"
brand.mkdir(parents=True, exist_ok=True)
draw(256).save(brand / "icon.png")
draw(512).save(brand / "icon@2x.png")
draw(256).save(brand / "logo.png")
draw(128).save(ROOT / "docs" / "icon.png")
print("ok")
