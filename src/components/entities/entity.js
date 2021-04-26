import styled, { css } from 'styled-components';
import { getColor } from '../../util/theme';

const S = {};
S.Entity = styled('div')`
  display:inline-block;
  position:relative;

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
    color: ${getColor(p.baseColor)};
    border-color: ${getColor(p.baseColor)};
    box-shadow: 0 0 .5rem .1rem ${getColor(p.baseColor)};
    border: .25rem solid ${getColor(p.baseColor)};
  `}

  ${p => p.isKilled && css`
    color: ${getColor('grey')};
    border-color: ${getColor('grey')};
    box-shadow: 0 0 .5rem .1rem ${getColor('grey')};
    border: .25rem solid ${getColor('grey')};
    opacity: .5;
  `};

  ${p => p.isAttacked && css`
    color: ${getColor('white')};
    border-color: ${getColor('white')};
    box-shadow: 0 0 .5rem .1rem ${getColor('white')};
    border: .25rem solid ${getColor('white')};
    opacity: 1;
  `};

  transition: all .2s;

  text-align:center;

  img{
    width:100%;
    height:100%;
  }
`
S.Text = styled('p')`

`;

function Entity({ type, text, isMatched, isAttacked, isKilled, givenStyle }) {
  return (
    <S.Entity 
      baseColor={type === 'hostile' ? 'red' : 'green'}
      isMatched={isMatched} 
      style={givenStyle ? givenStyle : null}
      isAttacked={isAttacked} 
      isKilled={isKilled} >
      <S.Text>{`${text}`}</S.Text>
    </S.Entity>
  );
}

export default Entity;
