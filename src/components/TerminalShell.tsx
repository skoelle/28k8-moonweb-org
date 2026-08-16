import { useEffect } from 'react';
import { findKeyEntry } from '../lib/keymap';
import { resetConnected } from '../lib/sound';
export default function TerminalShell({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const entry = findKeyEntry(e.key);
      if (!entry) return;
      if (entry.href === 'disconnect') { resetConnected(); window.location.href = '/'; return; }
      window.location.href = entry.href;
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return <>{children}</>;
}
