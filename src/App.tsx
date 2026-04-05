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
    width: '100%', 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    fontFamily: '"Courier New", monospace', 
    position: 'relative',
    margin: 0,
    padding: '20px'
  }}>
      {/* 배경 그리드 */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(0deg, rgba(255,0,127,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px', pointerEvents: 'none'
      }} />

      {/* 메인 컨테이너 (회색 윈도우 프레임) */}
      <div style={{ width: '95%', maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        <div style={{
          backgroundColor: '#c0c0c0', padding: '15px', border: '8px outset #ffffff',
          borderRightColor: '#808080', borderBottomColor: '#808080',
          boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 20px 20px 40px rgba(0,0,0,0.3)'
        }}>
          {/* 파란색 제목 바 */}
          <div style={{
            background: 'linear-gradient(90deg, #000080 0%, #1084d7 100%)', color: 'white',
            padding: '8px 12px', marginBottom: '12px', fontWeight: 'bold', fontSize: '12px',
            display: 'flex', justifyContent: 'space-between', letterSpacing: '2px',
            border: '2px solid #000080'
          }}>
            <span>🔴 EMOTION_RECOVERY_SYSTEM.exe</span>
            <span>━ □ ✕</span>
          </div>

          {/* 블랙 모니터 화면 */}
          <div style={{
            backgroundColor: '#000000', color: '#00ff00', padding: '30px',
            minHeight: '500px', border: '3px inset #ffffff', position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p>$ SYSTEM INITIALIZED...</p>
              
              {/* 픽셀몬 등장! */}
              <PixelMon emotion={emotion} />

              <p style={{ animation: 'flicker 0.15s infinite', color: '#ff00ff' }}>
                &gt; ERROR DETECTED IN SECTOR 7
              </p>
              <p>$ SELECT ERROR TYPE:</p>

              {/* 감정 버튼 세트 */}
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[
                  { id: 'anxiety', label: '[⚠️ WARNING_OVERLOAD]', text: '불안감' },
                  { id: 'depression', label: '[📉 LOW_ENERGY]', text: '우울함' },
                  { id: 'fatigue', label: '[⚡ SYSTEM_FATIGUE]', text: '피로감' },
                  { id: 'loneliness', label: '[📡 CONNECTION_LOST]', text: '고독감' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => handleEmotionSelect(btn.id)}
                    style={{
                      backgroundColor: emotion === btn.id ? '#00ff00' : '#001100',
                      color: emotion === btn.id ? '#000000' : '#00ff00',
                      border: emotion === btn.id ? '3px solid #ffff00' : '2px dashed #00ff00',
                      padding: '15px', cursor: 'pointer', fontFamily: '"Courier New", monospace',
                      fontSize: '12px', fontWeight: 'bold', transition: 'all 0.3s ease'
                    }}
                  >
                    {btn.label}<br />{btn.text}
                  </button>
                ))}
              </div>

              {/* 분석 결과 메시지 */}
              {showMessage && emotion && (
                <div style={{
                  marginTop: '30px', padding: '20px', border: '2px solid #ffff00',
                  backgroundColor: 'rgba(255,255,0,0.1)', color: '#ffff00', animation: 'fadeIn 0.5s ease'
                }}>
                  <p>$ ANALYZING {emotion.toUpperCase()}...</p>
                  <p>$ {emotionMessages[emotion as keyof typeof emotionMessages]}</p>
                  <p style={{ color: '#00ff00', marginTop: '15px' }}>$ 당신은 혼자가 아닙니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pixelGlitch {
          0% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(10% -10% 30% 0); transform: skew(2deg); }
          40% { clip-path: inset(40% 0 20% 0); }
          60% { clip-path: inset(10% 20% 50% 0); transform: skew(-2deg); }
          80% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes flicker { 0%, 18%, 22%, 25%, 54%, 56%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default App;