
import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '../../util/theme';
import { StoreContext } from '../../store/context';
import Legend from './legend';

const S = {};
S.Footer = styled('div')`
  position:relative;

  text-align:center;
`;

S.Buttons = styled('div')`
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-rows: 40% 30% 30%;

  right: 0;
  top: 0;
  position: absolute;
  height:100%;
  width: 30rem;
`;

S.UiButton = styled('div')`
  font-size: 2.5rem;
  text-align:center;
  border: 2px solid ${getColor('grey')};
  color: ${getColor('grey')};
  cursor: pointer;
  position:relative;

  &:hover{
    border: 2px solid ${getColor('blue')};
    color: ${getColor('blue')};
  }

  >p{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }
`;

S.LevelInfo = styled(S.UiButton)`
  font-size: 1.5rem;
  line-height: 1.5rem;
  grid-column: 1 / span 2;
  grid-row: 1 / 1;
`;

S.StartButton = styled(S.UiButton)`
  grid-column: 2;
  grid-row: 2 / span 2;
`;

S.PrevButton = styled(S.UiButton)`
  grid-column: 1;
  grid-row: 2;
`;

S.NextButton = styled(S.UiButton)`
  grid-column: 1;
  grid-row: 3;
`;

S.TextInput = styled('input')`
  height:4rem;
  width: 50rem;
  margin: 1rem;
  color:  ${getColor('blue')};
  border: 2px solid ${getColor('blue')};
  background: ${getColor('black')};

  font-size: 2.5rem;
  padding: 2rem;
  text-align:center;
  cursor:pointer;


  ::placeholder{
    color: ${getColor('grey')};
  }

  &:focus{
    outline: none !important;
    border: 2px solid ${getColor('blue')};
    box-shadow: 0 0 1rem ${getColor('blue')};

    ::placeholder{
      color: transparent;
    }
  }

  ${p => p.error && css`
    color:  ${getColor('red')};
    border: 2px solid ${getColor('red')};

    &:focus{
      border: 2px solid ${getColor('red')};
      box-shadow: 0 0 1rem ${getColor('red')};
    }
  `}

`;

S.Output = styled('div')`
  margin-top:-.5rem;
  font-size:1rem;
`;

S.OutputText = styled('div')`
  color: ${getColor('white')}
`;

S.OutputError = styled('p')`
  color: ${getColor('red')}
`;

S.Available = styled('div')`

`

S.ActiveExpressions = styled('p')`
  font-size: 2.5rem;
  display:inline-block;
  color: ${getColor('grey')};
  ${p => p.active && css`
    color: ${getColor('white')};
  `}
`

const onKeyDown = (key, value, submitText) => {
  if(key === 'Enter'){
    submitText(value);
  }
}

function Footer() {
  const { updateText, restartGame, submitText, error, text, nextLevel, prevLevel, activeExpressions } = useContext(StoreContext);
  
  const { levelData } = useContext(StoreContext);

  return (
    <S.Footer>
      <Legend />
      <S.TextInput value={text} error={error} placeholder={'enter a regex and hit enter'} type="text" onChange={(e) => { updateText(e.target.value)}} onKeyDown={e => onKeyDown(e.key, e.target.value, submitText)} />
      <S.Buttons>
        <S.LevelInfo><p>{`level: ${levelData.label} hostiles: ${levelData.hostiles}`}</p></S.LevelInfo>
        <S.PrevButton onClick={e => nextLevel()}><p>{'>'}</p></S.PrevButton>
        <S.NextButton onClick={e => prevLevel()}><p>{'<'}</p></S.NextButton>
        <S.StartButton onClick={e => restartGame()}><p>{'RESTART'}</p></S.StartButton> 
      </S.Buttons>
      <S.Available>
        <S.ActiveExpressions key={-1} active={false}>{'available: '}</S.ActiveExpressions>
        {activeExpressions.map((a,i) => (
          <S.ActiveExpressions key={i} active={a.active}>{a.value}</S.ActiveExpressions>
        ))}
      </S.Available>
    </S.Footer>
  );
}

export default Footer;
