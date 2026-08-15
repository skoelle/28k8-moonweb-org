export async function playLine1Sequence(onComplete: () => void) {
  const steps = ['/audio/dial-tone.mp3', '/audio/dtmf-beeps.mp3', '/audio/modem-handshake.mp3'];
  for (const src of steps) { await playClip(src); }
  onComplete();
}
function playClip(src: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio(src);
    audio.addEventListener('ended', () => resolve());
    audio.addEventListener('error', () => resolve());
    audio.play().catch(() => resolve());
  });
}
const STORAGE_KEY = 'hasConnected';
export function hasConnectedBefore(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}
export function markConnected() { localStorage.setItem(STORAGE_KEY, 'true'); }
export function resetConnected() { localStorage.removeItem(STORAGE_KEY); }
