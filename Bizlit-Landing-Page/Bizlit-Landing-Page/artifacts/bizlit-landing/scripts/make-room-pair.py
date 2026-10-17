#!/usr/bin/env python3
"""Draws the hero comparison pair: one living room, furnished and cleared.

Both frames come out of this one file, so the room itself — the two side walls,
the back wall, the boards, the skirting, the window and the light it throws —
is written once and painted identically into both. The wipe between the two
frames therefore lines up by construction rather than by eye: only the contents
change (rug, sofa, table, lamp, bookcase, boxes, plant, pictures).

Run:  python3 scripts/make-room-pair.py
Out:  public/img/services/room-furnished.svg
      public/img/services/room-cleared.svg
"""

from pathlib import Path

W, H = 1600, 900
# Where the room's lines converge. Above the middle, so we look slightly down
# into the room and the boards — where the work happens — take the frame.
VP = (800.0, 380.0)

INK = "#17102b"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "img" / "services"


# ---------------------------------------------------------------- projection


def toward(p, t):
    """Move a point towards the vanishing point by t (0 = here, 1 = at it)."""
    return (p[0] + t * (VP[0] - p[0]), p[1] + t * (VP[1] - p[1]))


def away(p, t):
    """Move a point towards the viewer, back along the line to the VP."""
    return (p[0] - t * (VP[0] - p[0]), p[1] - t * (VP[1] - p[1]))


def pts(seq):
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in seq)


def poly(seq, fill, opacity=None):
    o = f' opacity="{opacity}"' if opacity is not None else ""
    return f'<polygon points="{pts(seq)}" fill="{fill}"{o}/>'


def rect(x0, y0, x1, y1, fill, rx=None, opacity=None):
    r = f' rx="{rx}"' if rx else ""
    o = f' opacity="{opacity}"' if opacity is not None else ""
    return (
        f'<rect x="{x0:.1f}" y="{y0:.1f}" width="{x1 - x0:.1f}" '
        f'height="{y1 - y0:.1f}" fill="{fill}"{r}{o}/>'
    )


def flat(x0, x1, y, t, fill, opacity=None):
    """A footprint lying on the boards: a near edge, pushed t towards the VP."""
    return poly([(x0, y), (x1, y), toward((x1, y), t), toward((x0, y), t)], fill, opacity)


def shadow(x0, x1, y, t):
    """The pool a block sits in, so nothing floats on the boards."""
    return poly(
        [away((x0, y), 0.014), away((x1, y), 0.014), toward((x1, y), t), toward((x0, y), t)],
        INK,
        0.10,
    )


def box(front, t, front_fill, top_fill, side_fill):
    """A block standing on the boards: its front face, its top and one flank.

    Which flank shows is decided by where the block sits across the camera's
    axis — left of it we see the block's right side, right of it the left side.
    """
    x0, y0, x1, y1 = front
    ftl, ftr, fbl, fbr = (x0, y0), (x1, y0), (x0, y1), (x1, y1)
    btl, btr, bbl, bbr = toward(ftl, t), toward(ftr, t), toward(fbl, t), toward(fbr, t)
    out = []
    if y0 > VP[1]:  # the top edge is below the horizon, so we look down on it
        out.append(poly([ftl, ftr, btr, btl], top_fill))
    if x0 > VP[0]:
        out.append(poly([ftl, btl, bbl, fbl], side_fill))
    elif x1 < VP[0]:
        out.append(poly([ftr, btr, bbr, fbr], side_fill))
    out.append(rect(x0, y0, x1, y1, front_fill))
    return "".join(out)


# -------------------------------------------------------------------- shell

# The corners of the room: the near frame, and the back wall pushed 40% of the
# way to the vanishing point — which is what makes the back wall exactly 16:9.
NEAR = [(0, 0), (W, 0), (0, H), (W, H)]
BACK = [toward(p, 0.4) for p in NEAR]  # (320,152) (1280,152) (320,692) (1280,692)
NTL, NTR, NBL, NBR = NEAR
BTL, BTR, BBL, BBR = BACK

# The window, in the back wall. Both frames get it at exactly these numbers.
WIN = (900, 1180, 240, 560)


def shell():
    """Walls, boards, skirting, window, light. Written once, used by both."""
    out = [
        poly([NTL, NTR, BTR, BTL], "#ebe3fa"),             # ceiling
        poly([NTL, BTL, BBL, NBL], "#e0d4f6"),             # left wall
        poly([NTR, BTR, BBR, NBR], "#d7caf2"),             # right wall
        rect(BBL[0], BTL[1], BBR[0], BBL[1], "#f5f1fd"),   # back wall
        poly([NBL, NBR, BBR, BBL], "#d9c6a8"),             # boards
    ]

    # the boards, running away to the vanishing point
    out.append('<g clip-path="url(#boards)">')
    for i in range(-11, 26):
        x = VP[0] + i * 92
        out.append(
            f'<line x1="{VP[0]:.1f}" y1="{VP[1]:.1f}" x2="{x:.1f}" y2="{H + 20}" '
            'stroke="#c8b28c" stroke-width="2.6"/>'
        )
    for y in (708, 748, 800, 862):  # where the boards end, every second row
        out.append(
            f'<line x1="-40" y1="{y}" x2="{W + 40}" y2="{y}" stroke="#ccb794" stroke-width="2"/>'
        )
    # depth: the corners of the room go a shade darker than the middle
    out.append(f'<rect x="0" y="{BBL[1]}" width="{W}" height="{H - BBL[1]}" fill="url(#depth)"/>')
    out.append("</g>")

    # skirting, along all three junctions
    out.append(rect(BBL[0], BBL[1] - 18, BBR[0], BBL[1], "#f2edfd"))
    out.append(f'<line x1="{BBL[0]}" y1="{BBL[1] - 18}" x2="{BBR[0]}" y2="{BBL[1] - 18}" stroke="#d6c9f1" stroke-width="2"/>')
    out.append(poly([(0, H), BBL, (BBL[0], BBL[1] - 18), (0, H - 18)], "#ece5fa"))
    out.append(poly([(W, H), BBR, (BBR[0], BBR[1] - 18), (W, H - 18)], "#e3dbf7"))

    # the window: reveal, frame, glass, mullions, sill
    wx0, wx1, wy0, wy1 = WIN
    out += [
        rect(wx0 - 18, wy0 - 18, wx1 + 18, wy1 + 18, "#ffffff"),
        rect(wx0 - 18, wy0 - 18, wx1 + 18, wy1 + 18, "#ffffff"),
        rect(wx0, wy0, wx1, wy1, "url(#sky)"),
        poly([(wx0, wy0), (wx1, wy0), (wx1, wy1), (wx0, wy1)], "#cfe2fb", 0.35),
        rect((wx0 + wx1) / 2 - 8, wy0, (wx0 + wx1) / 2 + 8, wy1, "#ffffff"),
        rect(wx0, (wy0 + wy1) / 2 - 8, wx1, (wy0 + wy1) / 2 + 8, "#ffffff"),
        rect(wx0 - 26, wy1 + 18, wx1 + 26, wy1 + 36, "#ffffff"),   # sill
        rect(wx0 - 26, wy1 + 36, wx1 + 26, wy1 + 43, "#d9cdf3"),   # its shadow
    ]

    # the light the window throws across the boards
    out.append(
        poly(
            [
                (wx0 + 24, BBL[1]),
                (wx1 - 24, BBL[1]),
                away((wx1 - 24, BBL[1]), 0.66),
                away((wx0 + 24, BBL[1]), 0.66),
            ],
            "#fffdf6",
            0.55,
        )
    )
    return "".join(out)


# ---------------------------------------------------------------- contents


def contents():
    """Everything an owner would leave behind. Only the furnished frame gets it."""
    out = [
        # the rug, laid first so the furniture stands on it
        flat(180, 1080, 890, 0.34, "#d9cdf3"),
        flat(228, 1034, 872, 0.32, "#e6ddf9"),
    ]

    # sofa: seat, back, two arms, two seat cushions, two back cushions
    out += [
        shadow(236, 704, 800, 0.24),
        box((240, 660, 700, 800), 0.22, "#6f5f99", "#8f80b8", "#584a7d"),
        box((240, 546, 700, 660), 0.22, "#665691", "#8778b0", "#514371"),
        box((212, 578, 264, 790), 0.20, "#75659e", "#9a8cc1", "#584a7d"),
        box((676, 578, 728, 790), 0.20, "#75659e", "#9a8cc1", "#584a7d"),
        rect(264, 570, 452, 656, "#b3a8d6", rx=10),
        rect(460, 570, 676, 656, "#b3a8d6", rx=10),
        box((252, 646, 452, 660), 0.22, "#c2b8e0", "#d2cae8", "#a89dcb"),
        box((456, 646, 688, 660), 0.22, "#c2b8e0", "#d2cae8", "#a89dcb"),
    ]

    # coffee table: legs first, then the top, then what is left on it
    out += [
        shadow(396, 724, 884, 0.16),
        rect(418, 846, 442, 882, "#8f6440"),
        rect(678, 846, 702, 882, "#8f6440"),
        box((400, 820, 720, 846), 0.16, "#b98d5f", "#d3a774", "#9a7146"),
        box((500, 792, 622, 818), 0.10, "#6d28d9", "#8b4ee6", "#5b21b6"),
        rect(650, 798, 684, 820, "#f2c76b", rx=5),
    ]

    # floor lamp, standing in beside the sofa
    out += [
        shadow(146, 224, 840, 0.05),
        rect(178, 592, 192, 838, "#6f6889"),
        poly([(118, 540), (252, 540), (228, 598), (142, 598)], "#faf6ff"),
        poly([(146, 558), (224, 558), (228, 598), (142, 598)], "#f2c76b", 0.8),
    ]

    # bookcase in the right of the room: four bays, with what is on them
    bc = (1120, 600, 1300, 820)
    out += [
        shadow(bc[0] - 12, bc[2] + 8, bc[3], 0.30),
        box(bc, 0.30, "#a97d4f", "#c49b69", "#8a6440"),
    ]
    for y in (652, 706, 760):
        out.append(rect(bc[0] + 8, y, bc[2] - 8, y + 9, "#f7f0e4"))
    for item in (
        (1132, 618, 1152, 650, "#6d28d9"),
        (1156, 626, 1184, 650, "#c9a3f0"),
        (1188, 614, 1210, 650, "#fbb130"),
        (1130, 664, 1176, 704, "#d8ab7a"),
        (1182, 676, 1222, 704, "#c99b68"),
        (1228, 688, 1266, 704, "#e0b98d"),
        (1132, 718, 1152, 758, "#6d28d9"),
        (1156, 724, 1176, 758, "#ec4899"),
        (1180, 716, 1202, 758, "#4c1d95"),
        (1220, 728, 1268, 758, "#7c9a6b", 10),
        (1132, 772, 1220, 812, "#c99b68"),
        (1240, 778, 1286, 812, "#8fa3c8", 6),
    ):
        out.append(rect(*item))

    # a stack of moving boxes and a bag, out in the middle of the room
    out += [
        shadow(756, 1030, 884, 0.18),
        box((760, 800, 900, 880), 0.16, "#d8ab7a", "#e8c49a", "#bd8f5e"),
        box((776, 740, 884, 800), 0.16, "#cfa374", "#e0ba8e", "#b48a5c"),
        box((914, 822, 1024, 878), 0.14, "#c99b68", "#ddb286", "#b0865a"),
        rect(920, 856, 1018, 892, "#7c92ba", rx=10),  # a canvas bag on the boards
        rect(940, 838, 998, 858, "#6b81a9", rx=8),
    ]

    # a plant in the near right corner
    out += [
        shadow(1318, 1424, 872, 0.14),
        box((1330, 800, 1412, 866), 0.14, "#cf8f6a", "#dd9f78", "#b37454"),
        '<g fill="#6f9e6a">'
        '<ellipse cx="1338" cy="752" rx="26" ry="52" transform="rotate(-24 1338 752)"/>'
        '<ellipse cx="1396" cy="744" rx="26" ry="56" transform="rotate(16 1396 744)"/>'
        '<ellipse cx="1368" cy="698" rx="22" ry="54"/>'
        '<ellipse cx="1320" cy="788" rx="22" ry="38" transform="rotate(-40 1320 788)"/>'
        '<ellipse cx="1412" cy="782" rx="20" ry="40" transform="rotate(38 1412 782)"/>'
        "</g>",
    ]

    # two pictures on the back wall — they leave with the contents
    out += [
        rect(468, 246, 648, 408, "#ffffff"),
        rect(484, 262, 632, 392, "#c8b8ee"),
        rect(690, 286, 806, 384, "#ffffff"),
        rect(704, 300, 792, 370, "#f0d9a8"),
    ]
    return "".join(out)


# ------------------------------------------------------------------- output


def document(body: str, title: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice" role="img">'
        f"<title>{title}</title>"
        "<defs>"
        '<linearGradient id="sky" x1="0" y1="0" x2="0.4" y2="1">'
        '<stop offset="0%" stop-color="#bcd9fb"/>'
        '<stop offset="60%" stop-color="#dcecff"/>'
        '<stop offset="100%" stop-color="#f2f8ff"/>'
        "</linearGradient>"
        '<linearGradient id="depth" x1="0" y1="0" x2="0" y2="1">'
        '<stop offset="0%" stop-color="#17102b" stop-opacity="0.10"/>'
        '<stop offset="100%" stop-color="#17102b" stop-opacity="0"/>'
        "</linearGradient>"
        f'<clipPath id="boards"><polygon points="{pts([NBL, NBR, BBR, BBL])}"/></clipPath>'
        "</defs>"
        f"{body}</svg>\n"
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    shared = shell()
    pair = {
        "room-furnished.svg": document(shared + contents(), "A furnished living room"),
        "room-cleared.svg": document(shared, "The same living room, cleared and swept"),
    }
    for name, svg in pair.items():
        path = OUT_DIR / name
        path.write_text(svg, encoding="utf-8")
        print(f"wrote {path.relative_to(OUT_DIR.parent.parent.parent)} ({len(svg.encode()) // 1024} KB)")


if __name__ == "__main__":
    main()
