import styled, { css } from 'styled-components';
import logo from '../logo.svg';
import { getColor } from '../util/theme';

const S = {};
S.Enemy = styled('div')`
  display:inline-block;

  margin: .5rem;
  width: calc(25% - 1rem);

  ${p => p.isMatched ? css`
    color: ${getColor('green')};
    border: .25rem solid ${getColor('green')};
  `: css`
    color: ${getColor('red')};
    border: .25rem solid ${getColor('red')};
  `}

  ${p => p.isAttacked && css`
    color: ${getColor('purple')};
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

function Enemy({ text, isMatched, isAttacked }) {
  return (
    <S.Enemy isMatched={isMatched} isAttacked={isAttacked}>
      <img src={logo} className="react-logo" alt="logo" />
      <S.Text>{`"${text}"`}</S.Text>
    </S.Enemy>
  );
}

export default Enemy;
