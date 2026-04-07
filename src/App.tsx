import { useState } from 'react'
import BootingScreen from './BootingScreen' 
import PixelMon from './PixelMon'           

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [emotion, setEmotion] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  const handleEmotionSelect = (emotionType: string) => {
    setEmotion(emotionType)
    setShowMessage(true)
  }

  const emotionMessages = {
    anxiety: '⚠️ WARNING_OVERLOAD DETECTED\n당신의 불안은 일시적인 오류입니다...',
    depression: '📉 LOW_ENERGY ALERT\n에너지 회복 프로토콜 시작...',
    fatigue: '⚡ SYSTEM_FATIGUE\n휴식 모드로 전환 중...',
    loneliness: '📡 CONNECTION_LOST\n다시 연결하는 중...',
  }

  if (isBooting) {
    return <BootingScreen onFinish={() => setIsBooting(false)} />;
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', fontFamily: '"Courier New", monospace',
      position: 'relative', margin: 0, padding: '20px'
    }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(0deg, rgba(255,0,127,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px', pointerEvents: 'none' }} />

      <div style={{ width: '95%', maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        <div style={{ backgroundColor: '#c0c0c0', padding: '15px', border: '8px outset #ffffff',
          borderRightColor: '#808080', borderBottomColor: '#808080',
          boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 20px 20px 40px rgba(0,0,0,0.3)' }}>
          
          <div style={{ background: 'linear-gradient(90deg, #000080 0%, #1084d7 100%)', color: 'white',
            padding: '8px 12px', marginBottom: '12px', fontWeight: 'bold', fontSize: '12px',
            display: 'flex', justifyContent: 'space-between', border: '2px solid #000080' }}>
            <span>🔴 EMOTION_RECOVERY_SYSTEM.exe</span>
            <span>━ □ ✕</span>
          </div>

          <div style={{ backgroundColor: '#000000', color: '#00ff00', padding: '30px',
            minHeight: '500px', border: '3px inset #ffffff', position: 'relative', overflow: 'hidden' }}>
            
            <p>$ SYSTEM INITIALIZED...</p>
            <PixelMon emotion={emotion || 'default'} />
            
            <p style={{ animation: 'flicker 0.15s infinite', color: '#ff00ff' }}>&gt; ERROR DETECTED IN SECTOR 7</p>
            <p>$ SELECT ERROR TYPE:</p>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {[
                { id: '불안', label: '[⚠️ WARNING_OVERLOAD]', text: '불안감', key: 'anxiety' },
                { id: '우울', label: '[📉 LOW_ENERGY]', text: '우울함', key: 'depression' },
                { id: '피로', label: '[⚡ SYSTEM_FATIGUE]', text: '피로감', key: 'fatigue' },
                { id: '고독', label: '[📡 CONNECTION_LOST]', text: '고독감', key: 'loneliness' }
              ].map((btn) => (
                <button key={btn.id} onClick={() => handleEmotionSelect(btn.id)}
                  style={{
                    backgroundColor: emotion === btn.id ? '#00ff00' : '#001100',
                    color: emotion === btn.id ? '#000000' : '#00ff00',
                    border: emotion === btn.id ? '3px solid #ffff00' : '2px dashed #00ff00',
                    padding: '15px', cursor: 'pointer', fontFamily: '"Courier New", monospace'
                  }}>
                  {btn.label}<br />{btn.text}
                </button>
              ))}
            </div>

            {showMessage && emotion && (
              <div style={{ marginTop: '30px', padding: '20px', border: '2px solid #ffff00',
                backgroundColor: 'rgba(255,255,0,0.1)', color: '#ffff00' }}>
                <p>$ ANALYZING {emotion === '불안' ? 'ANXIETY' : emotion === '우울' ? 'DEPRESSION' : 'EMOTION'}...</p>
                <p>$ {emotion === '불안' ? emotionMessages.anxiety : emotion === '우울' ? emotionMessages.depression : emotion === '피로' ? emotionMessages.fatigue : emotionMessages.loneliness}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;