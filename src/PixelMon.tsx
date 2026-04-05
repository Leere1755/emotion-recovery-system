const PixelMon = ({ emotion }: { emotion: string | null }) => {
  const getMonColor = () => {
    switch (emotion) {
      case 'anxiety': return '#ff0000';
      case 'depression': return '#0000ff';
      case 'fatigue': return '#ffff00';
      case 'loneliness': return '#800080';
      default: return '#00ff00';
    }
  };

  return (
    <div style={{
      width: '60px', height: '60px',
      backgroundColor: getMonColor(),
      margin: '20px auto',
      boxShadow: `0 0 20px ${getMonColor()}`,
      animation: 'float 3s ease-in-out infinite, pixelGlitch 1s infinite',
      position: 'relative',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 2
    }}>
      <div style={{ width: '80%', height: '10%', display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '10px', height: '10px', backgroundColor: '#000' }} />
        <div style={{ width: '10px', height: '10px', backgroundColor: '#000' }} />
      </div>
      <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '15px', height: '15px', backgroundColor: getMonColor(), opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: '-5px', left: '-15px', width: '10px', height: '10px', backgroundColor: getMonColor(), opacity: 0.4 }} />
    </div>
  );
};

const pixelStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  @keyframes pixelGlitch {
    0% { clip-path: inset(0 0 0 0); }
    20% { clip-path: inset(10% -10% 30% 0); transform: skew(2deg); }
    40% { clip-path: inset(40% 0 20% 0); }
    60% { clip-path: inset(10% 20% 50% 0); transform: skew(-2deg); }
    80% { clip-path: inset(0 0 0 0); }
    100% { clip-path: inset(0 0 0 0); }
  }
`;

export default PixelMon; 