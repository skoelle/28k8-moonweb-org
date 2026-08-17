import { useState, useEffect } from 'react';
import { playLine1Sequence, markConnected } from '../lib/sound';
type DialState = 'idle' | 'dialing';
export default function ModemIntro() {
  const [state, setState] = useState<DialState>('idle');
  function selectLine(line: 1 | 2) {
    if (line === 2) { markConnected(); window.location.href = '/bbs/'; return; }
    setState('dialing');
    playLine1Sequence(() => { markConnected(); window.location.href = '/bbs/'; });
  }
  useEffect(() => {
    if (state !== 'idle') return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === '1') { selectLine(1); }
      if (e.key === '2') { selectLine(2); }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state]);
  return (
    <div className="ansi-text welcome-modem" role="region" aria-label="Modem connect intro">
      <pre style={{ textAlign: 'center' }}>{`+------------------------------------------+
|  28k8   [MODEM]   ATDT +49-821-2191-038  |
+------------------------------------------+`}</pre>
      {state === 'idle' && (
        <pre style={{ textAlign: 'center' }}><a href="#" onClick={(e) => { e.preventDefault(); selectLine(1); }}>{`> Line 1: +49-821-2191-038 [VFC V34] 28800 <`}</a>{'\n\n'}<a href="/bbs/" onClick={(e) => { e.preventDefault(); selectLine(2); }}>{`> Line 2: +49-821-2191-036 [X75]     64000 <`}</a>{'\n\n'}<span className="select-line-hint">{`>>>>>>>>> SELECT A LINE TO CONNECT <<<<<<<<<`}</span></pre>
      )}
      {state === 'dialing' && <p style={{ textAlign: 'center' }}>Dialing... please wait.</p>}
    </div>
  );
}
