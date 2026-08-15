"""tools/generate_ansi.py - starting point / font reference for src/lib/ansiArt.ts.
See SPEC.md section 9 for why precomputed HTML is used instead of a live ANSI parser."""
FONT = {
    'A': [".###.","#...#","#...#","#####","#...#","#...#","#...#"],
    'B': ["####.","#...#","#...#","####.","#...#","#...#","####."],
    'S': [".####","#....","#....",".###.","....#","....#","####."],
    ' ': ["....." for _ in range(7)],
}
if __name__ == "__main__":
    print("Reference font + starting point. Full logic documented in SPEC.md/PLAN.md.")
