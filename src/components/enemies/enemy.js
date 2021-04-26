import styled, { css } from 'styled-components';
import { getColor } from '../../util/theme';

const WIDTH = 150;
const SPACER_WIDTH = 35;

const S = {};
S.Enemy = styled('div')`
  position: absolute;

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
    color: ${getColor('blue')};
    border-color: ${getColor('blue')};
    box-shadow: 0 0 .5rem .1rem ${getColor('blue')};
    border: .25rem solid ${getColor('blue')};
  `: css`
    color: ${getColor('red')};
    border-color: ${getColor('red')};
    box-shadow: 0 0 .5rem .1rem ${getColor('red')};
    border: .25rem solid ${getColor('red')};
  `}

  ${p => p.isAttacked && css`
    color: ${getColor('grey')};
    border-color: ${getColor('grey')};
    box-shadow: 0 0 .5rem .1rem ${getColor('grey')};
    border: .25rem solid ${getColor('grey')};
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
