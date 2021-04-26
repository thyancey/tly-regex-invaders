import styled, { css } from 'styled-components';
import logo from '../logo.svg';
import { getColor, getFont } from '../util/theme';

const WIDTH = 150;
const SPACER_WIDTH = 50;

const S = {};
S.Enemy = styled('div')`
  position: absolute;
  ${'' /* display:inline-block; */}

  width: ${WIDTH}px;
  height: 100%;

  padding: 1rem 2rem;

  p{
    border: 1px dashed;
    white-space: pre; /* this allows " " to take up room */
    border-top:0;
    border-bottom:0;
    padding: 0 .5rem;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  ${p => p.isMatched ? css`
    color: ${getColor('green')};
    border-color: ${getColor('green')};
    box-shadow: 0 0 .5rem .1rem ${getColor('green')};
    border: .25rem solid ${getColor('green')};
  `: css`
    color: ${getColor('red')};
    border-color: ${getColor('red')};
    box-shadow: 0 0 .5rem .1rem ${getColor('red')};
    border: .25rem solid ${getColor('red')};
  `}

  ${p => p.isAttacked && css`
    color: ${getColor('purple')};
    border-color: ${getColor('purple')};
    box-shadow: 0 0 .5rem .1rem ${getColor('purple')};
    border: .25rem solid ${getColor('purple')};
    opacity: .5;
  `};

  text-align:center;

  img{
    width:100%;
    height:100%;
  }
`
S.Text = styled('p')`

`;

function Enemy({ text, row, col, isMatched, isAttacked }) {
  return (
    <S.Enemy isMatched={isMatched} isAttacked={isAttacked} style={{ left: col * (WIDTH + SPACER_WIDTH) }}>
      <S.Text>{`${text}`}</S.Text>
    </S.Enemy>
  );
}

export default Enemy;
