import styled, { keyframes } from 'styled-components';

const wobble = keyframes`
  0%, 100% { transform: scale(1) translate(0, 0); }
  25% { transform: scale(1.05) translate(2px, -2px); }
  50% { transform: scale(0.95) translate(-2px, 2px); }
  75% { transform: scale(1.02) translate(1px, 1px); }
`;

const MonsterWrapper = styled.div<{ $emotion: string }>`
  width: 150px;
  height: 150px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
  filter: drop-shadow(0 0 15px ${(props) => 
    props.$emotion === '우울' ? '#4A90E2' : 
    props.$emotion === '불안' ? '#00FF00' : 
    '#FF00FF'});

  animation: ${wobble} 2s infinite ease-in-out;

  img {
    width: 100%;
    image-rendering: pixelated;
  }
`;

const PixelMon = ({ emotion }: { emotion: string }) => {
  return (
    <MonsterWrapper $emotion={emotion}>
    <img src="https://robohash.org/P-07?set=set4&size=150x150" alt="P-07" />
    </MonsterWrapper>
  );
};

export default PixelMon;