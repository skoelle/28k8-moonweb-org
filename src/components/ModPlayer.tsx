import { useState, useRef, useCallback } from 'react';

export interface ModEntry {
  name: string;
  title: string;
  size_human: string;
  channels: number;
  sample_count: number;
  modified: string;
  url: string;
}

declare global {
  interface Window {
    ChiptuneJsPlayer: any;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

async function getPlayer(): Promise<any> {
  await loadScript('/js/chiptune3.js');
  return new Promise<any>((resolve) => {
    const p = new window.ChiptuneJsPlayer({ repeatCount: 0 });
    p.onInitialized(() => resolve(p));
  });
}

export default function ModPlayer({ mods }: { mods: ModEntry[] }) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<any>(null);
  const loadingRef = useRef(false);

  const ensurePlayer = useCallback(async () => {
    if (playerRef.current) return playerRef.current;
    if (loadingRef.current) return null;
    loadingRef.current = true;
    try {
      const p = await getPlayer();
      p.onEnded(() => {
        setCurrentIdx((prev) => {
          const next = prev + 1;
          if (next < mods.length) {
            p.setRepeatCount(0);
            p.load(mods[next].url);
            return next;
          }
          setPlaying(false);
          return -1;
        });
      });
      playerRef.current = p;
      setReady(true);
      return p;
    } catch (e) {
      console.error('MOD player init failed:', e);
      loadingRef.current = false;
      return null;
    }
  }, [mods]);

  const playIdx = useCallback(async (idx: number) => {
    if (idx < 0 || idx >= mods.length) return;
    const p = await ensurePlayer();
    if (!p) return;
    p.setRepeatCount(0);
    p.load(mods[idx].url);
    setCurrentIdx(idx);
    setPlaying(true);
  }, [mods, ensurePlayer]);

  async function togglePlay(idx: number) {
    const p = playerRef.current;
    if (currentIdx === idx && playing) {
      p?.pause();
      setPlaying(false);
    } else if (currentIdx === idx && !playing) {
      p?.unpause();
      setPlaying(true);
    } else {
      playIdx(idx);
    }
  }

  function prev() {
    if (currentIdx > 0) playIdx(currentIdx - 1);
  }

  function next() {
    if (currentIdx < mods.length - 1) playIdx(currentIdx + 1);
  }

  const current = currentIdx >= 0 ? mods[currentIdx] : null;

  return (
    <div className="mod-player">
      <div className="mod-player-nowplaying">
        <span className="mod-player-label">NOW PLAYING:</span>{' '}
        {current
          ? <span className="mod-player-track">{current.title} <span className="mod-player-file">({current.name})</span></span>
          : <span className="mod-player-idle">-- nothing selected --</span>
        }
        <span className="mod-player-controls">
          <button onClick={prev} disabled={currentIdx <= 0} className="mod-btn" title="Previous">|&lt;&lt;</button>
          <button onClick={() => currentIdx >= 0 ? togglePlay(currentIdx) : playIdx(0)} className="mod-btn mod-btn-play" title={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={next} disabled={currentIdx >= mods.length - 1} className="mod-btn" title="Next">&gt;&gt;|</button>
        </span>
      </div>
      <table className="mod-list">
        <tbody>
          {mods.map((m, i) => (
            <tr key={m.name} className={currentIdx === i ? 'mod-active' : ''}>
              <td className="mod-col-play">
                <button onClick={() => togglePlay(i)} className="mod-btn-inline" title={currentIdx === i && playing ? 'Pause' : 'Play'}>
                  {currentIdx === i && playing ? '⏸' : '▶'}
                </button>
              </td>
              <td className="mod-col-file">[F] {m.name}</td>
              <td className="mod-col-title">{m.title}</td>
              <td className="mod-col-ch">{m.channels}ch</td>
              <td className="mod-col-size">{m.size_human}</td>
              <td><a href={m.url}>[D]ownload</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
