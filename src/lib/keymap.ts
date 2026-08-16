export type KeymapEntry = { key: string; href: string; label: string };
export const GLOBAL_NAV_KEYS: KeymapEntry[] = [
  { key: 'B', href: '/bbs/', label: 'Back to Main Menu' },
  { key: 'Q', href: 'disconnect', label: 'Disconnect' },
  { key: 'I', href: '/bbs/legal-notice', label: 'Legal Notice' },
];
export const MENU_KEYS: KeymapEntry[] = [
  { key: 'P', href: '/bbs/pc/phobia', label: 'PHOB!A' },
  { key: 'T', href: '/bbs/pc/trancemission', label: 'Tr@nceMISSION' },
  { key: 'S', href: '/bbs/pc/skyline', label: 'SkyLINE Productions' },
  { key: 'K', href: '/bbs/pc/kosmos-design', label: 'Kosmos Design [KDS]' },
  { key: 'D', href: '/bbs/atari/tropic-dreams', label: 'Tropic DREAMs' },
  { key: 'E', href: '/bbs/amiga/esprit', label: 'ESPRIT Releases' },
  { key: 'M', href: '/bbs/amiga/mods', label: 'MOD Files' },
  { key: 'A', href: '/bbs/fido/ansi-art', label: 'BBS ANSI Art' },
  { key: 'F', href: '/bbs/fido/nodelist', label: 'Fidonets and Nodelists' },
];
export const ALL_KEYS: KeymapEntry[] = [...GLOBAL_NAV_KEYS, ...MENU_KEYS];
export function findKeyEntry(pressedKey: string): KeymapEntry | undefined {
  const upper = pressedKey.toUpperCase();
  return ALL_KEYS.find((entry) => entry.key === upper);
}
