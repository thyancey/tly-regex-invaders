import styled from 'styled-components';
import { getColor } from '../util/theme';

const S = {};
S.Bg = styled('div')`
  width:100%;
  height:100%;
  background-color: ${getColor('black')};
  overflow:hidden;
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;


  h1{
    color:white;
    font-size:15rem;
    opacity:.05;

    word-break: break-all;
  }
`;

S.Grid = styled('div')`
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  opacity: .5;

  background-image:
      repeating-linear-gradient(${getColor('grey')} 0 .2rem, transparent .2rem 100%),
      repeating-linear-gradient(90deg, ${getColor('grey')} 0 .2rem, transparent .2rem 100%);
  background-size: 2rem 2rem;

  height:calc(100% + 2rem);
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: normal;

  @keyframes grid-mover {
    from {
      transform: translate3d(0, 0, 0)
    }
    to {
      transform: translate3d(0, -2rem, 0)
    }
  }

  animation-name: grid-mover;
`







function Bg() {

  return (
    <S.Bg>
      {/* <h1>{'/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/Regex!nv@ders/'}</h1> */}
      <S.Grid/>
    </S.Bg>
  );
}

export default Bg;
