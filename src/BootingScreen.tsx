import { useState, useEffect } from 'react';

const BootingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const fullLogs = [
    "> ERR_07 SYSTEM v1.0.2 STARTING...",
    "> INITIALIZING EMOTION DATA CORE...",
    "> LOADING PIXEL-MON PROTOCOL (P-07)...",
    "> ACCESSING DREAMCORE REALM...",
    "> SYSTEM READY. DEPLOYING INTERFACE..."
  ];

  useEffect(() => {
    fullLogs.forEach((log, index) => {
      setTimeout(() => setLogs(prev => [...prev, log]), (index + 1) * 800);
    });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 1000); 
          return 100;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
    backgroundColor: '#000', 
    color: '#00ff00', 
    height: '100vh', 
    width: '100%',     // ◀ 100vw를 100%로 수정!
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    fontFamily: '"Courier New", monospace', 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    zIndex: 100
  }}>
      <div style={{ width: '80%', maxWidth: '500px' }}>
        {logs.map((log, i) => <p key={i} style={{ margin: '5px 0', fontSize: '14px' }}>{log}</p>)}
        <div style={{ border: '1px solid #00ff00', height: '20px', marginTop: '20px', position: 'relative' }}>
          <div style={{ width: `${progress}%`, backgroundColor: '#00ff00', height: '100%' }} />
        </div>
        <p style={{ textAlign: 'right' }}>{progress}% COMPLETE</p>
      </div>
    </div>
  );
};

export default BootingScreen;