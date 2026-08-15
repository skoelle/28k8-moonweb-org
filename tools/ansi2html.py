#!/usr/bin/env python3
"""tools/ansi2html.py - Convert real .ANS (ANSI BBS) files to HTML for the website.

Reads a .ANS file, simulates an 80x25 terminal, and outputs an HTML string
using CSS classes for the 16 ANSI foreground/background colors.

Usage:
    python3 tools/ansi2html.py source-assets/ansi/skyline.ans
    python3 tools/ansi2html.py source-assets/ansi/skyline.ans --var BANNER_SKYLINE
"""

import sys
import html as html_mod


def cp437_char(byte_val: int) -> str:
    """Convert a CP437 byte value (0-255) to a Unicode character using Python's codec."""
    return bytes([byte_val]).decode("cp437")


# ── ANSI 16-color palette → CSS class names ───────────────────────────────────
# FG class: c-fg-N   BG class: c-bg-N
# Bold on fg 0-7 brightens to 8-15 (handled in parser).

ANSI_FG_CLASS = {
    0: "c-fg-0",   1: "c-fg-1",   2: "c-fg-2",   3: "c-fg-3",
    4: "c-fg-4",   5: "c-fg-5",   6: "c-fg-6",   7: "c-fg-7",
    8: "c-fg-8",   9: "c-fg-9",   10: "c-fg-10", 11: "c-fg-11",
    12: "c-fg-12", 13: "c-fg-13", 14: "c-fg-14", 15: "c-fg-15",
}

ANSI_BG_CLASS = {
    0: "c-bg-0",   1: "c-bg-1",   2: "c-bg-2",   3: "c-bg-3",
    4: "c-bg-4",   5: "c-bg-5",   6: "c-bg-6",   7: "c-bg-7",
    8: "c-bg-8",   9: "c-bg-9",   10: "c-bg-10", 11: "c-bg-11",
    12: "c-bg-12", 13: "c-bg-13", 14: "c-bg-14", 15: "c-bg-15",
}


# ── Terminal cell ──────────────────────────────────────────────────────────────
class Cell:
    __slots__ = ("char", "fg", "bg", "bold")
    def __init__(self, char=" ", fg=7, bg=0, bold=False):
        self.char = char
        self.fg = fg
        self.bg = bg
        self.bold = bold


# ── ANSI parser ────────────────────────────────────────────────────────────────
def parse_ansi_to_html(data: bytes, width: int = 80, max_rows: int = 25) -> str:
    """Parse raw ANSI bytes into an HTML string with CSS color classes."""
    screen = [[Cell() for _ in range(width)] for _ in range(max_rows)]
    cur_row, cur_col = 0, 0
    fg, bg, bold = 7, 0, False

    i = 0
    length = len(data)

    while i < length:
        b = data[i]

        if b == 0x1B:  # ESC
            i += 1
            if i >= length:
                break
            if data[i] != 0x5B:  # '[' — not a CSI sequence
                continue
            i += 1
            # Collect parameter bytes until a final letter
            params = []
            num_str = ""
            while i < length:
                c = data[i]
                if 0x30 <= c <= 0x39:  # '0'-'9'
                    num_str += chr(c)
                    i += 1
                elif c == 0x3B:  # ';'
                    params.append(int(num_str) if num_str else 0)
                    num_str = ""
                    i += 1
                elif c == 0x6D:  # 'm' — SGR (color/style)
                    params.append(int(num_str) if num_str else 0)
                    i += 1
                    fg, bg, bold = _apply_sgr(params, fg, bg, bold)
                    break
                elif c == 0x48 or c == 0x66:  # 'H' or 'f' — cursor position
                    params.append(int(num_str) if num_str else 0)
                    i += 1
                    row = (params[0] if len(params) > 0 else 1) - 1
                    col = (params[1] if len(params) > 1 else 1) - 1
                    cur_row = max(0, min(row, max_rows - 1))
                    cur_col = max(0, min(col, width - 1))
                    break
                elif c == 0x43:  # 'C' — cursor forward (right)
                    n = int(num_str) if num_str else 1
                    i += 1
                    cur_col = min(cur_col + n, width - 1)
                    break
                elif c == 0x44:  # 'D' — cursor back (left)
                    n = int(num_str) if num_str else 1
                    i += 1
                    cur_col = max(cur_col - n, 0)
                    break
                elif c == 0x4A:  # 'J' — erase display
                    params.append(int(num_str) if num_str else 0)
                    i += 1
                    if not params or params[0] in (2, 3):
                        screen = [[Cell() for _ in range(width)] for _ in range(max_rows)]
                    break
                elif c == 0x4B:  # 'K' — erase line
                    params.append(int(num_str) if num_str else 0)
                    i += 1
                    if cur_row < max_rows:
                        screen[cur_row] = [Cell() for _ in range(width)]
                    break
                elif 0x40 <= c <= 0x7E:  # Final byte of unknown CSI
                    i += 1
                    break
                else:
                    i += 1
        elif b == 0x0D:  # CR
            i += 1
        elif b == 0x0A:  # LF
            cur_col = 0
            cur_row += 1
            if cur_row >= max_rows:
                cur_row = max_rows - 1
            i += 1
        elif b == 0x09:  # TAB
            cur_col = min(cur_col + 8, width - 1)
            i += 1
        elif b == 0x07:  # BEL
            i += 1
        else:
            char = cp437_char(b)
            if cur_row < max_rows and cur_col < width:
                screen[cur_row][cur_col] = Cell(char, fg, bg, bold)
            cur_col += 1
            if cur_col >= width:
                cur_col = 0
                cur_row += 1
                if cur_row >= max_rows:
                    cur_row = max_rows - 1
            i += 1

    return _render_screen(screen)


def _apply_sgr(params, fg, bg, bold):
    """Apply SGR (Select Graphic Rendition) parameters. Returns (fg, bg, bold)."""
    j = 0
    while j < len(params):
        p = params[j]
        if p == 0:
            fg, bg, bold = 7, 0, False
        elif p == 1:
            bold = True
        elif p == 2:
            bold = False
        elif p == 22:
            bold = False
        elif 30 <= p <= 37:
            fg = p - 30
        elif p == 39:
            fg = 7
        elif 40 <= p <= 47:
            bg = p - 40
        elif p == 49:
            bg = 0
        elif 90 <= p <= 97:
            fg = p - 90 + 8
        elif 100 <= p <= 107:
            bg = p - 100 + 8
        j += 1
    return fg, bg, bold


def _render_screen(screen):
    """Render the terminal screen buffer to HTML."""
    lines = []
    for row in screen:
        # Trim trailing spaces (on default bg)
        last_non_space = len(row) - 1
        while last_non_space >= 0 and row[last_non_space].char == " " and row[last_non_space].bg == 0:
            last_non_space -= 1
        row = row[:last_non_space + 1]

        row_html = ""
        seg_fg, seg_bg, seg_bold = None, None, False
        seg_chars = []

        for cell in row:
            effective_fg = 15 if (cell.bold and cell.fg < 8) else cell.fg
            key = (effective_fg, cell.bg, cell.bold)
            if key != (seg_fg, seg_bg, seg_bold) or not seg_chars:
                if seg_chars:
                    row_html += _span(seg_fg, seg_bg, seg_bold, "".join(seg_chars))
                seg_fg, seg_bg, seg_bold = effective_fg, cell.bg, cell.bold
                seg_chars = [cell.char]
            else:
                seg_chars.append(cell.char)

        if seg_chars:
            row_html += _span(seg_fg, seg_bg, seg_bold, "".join(seg_chars))

        lines.append(row_html)

    # Trim trailing empty lines
    while lines and lines[-1].strip() == "":
        lines.pop()

    return "\n".join(lines)


def _span(fg, bg, bold, text):
    """Render a styled text segment as an HTML span with CSS classes."""
    if not text:
        return ""
    fg_cls = ANSI_FG_CLASS.get(fg, "c-fg-7")
    bg_cls = ANSI_BG_CLASS.get(bg, "c-bg-0")
    classes = f"{fg_cls} {bg_cls}"
    if bold:
        classes += " c-bold"
    return f'<span class="{classes}">{html_mod.escape(text)}</span>'


# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <file.ans> [--var NAME] [--max-rows N]", file=sys.stderr)
        sys.exit(1)

    filepath = sys.argv[1]
    var_name = None
    max_rows = 25

    args = sys.argv[2:]
    i = 0
    while i < len(args):
        if args[i] == "--var" and i + 1 < len(args):
            var_name = args[i + 1]
            i += 2
        elif args[i] == "--max-rows" and i + 1 < len(args):
            max_rows = int(args[i + 1])
            i += 2
        else:
            i += 1

    with open(filepath, "rb") as f:
        data = f.read()

    html_content = parse_ansi_to_html(data, width=80, max_rows=max_rows)

    if var_name:
        escaped = html_content.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        print(f'export const {var_name} = "<pre class=\\"ansi-text ansi-full\\">{escaped}</pre>";')
    else:
        print(f'<pre class="ansi-text ansi-full">{html_content}</pre>')


if __name__ == "__main__":
    main()
