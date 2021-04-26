
import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '../../util/theme';
import { StoreContext } from '../../store/context';
import Legend from './legend';

const S = {};
S.Footer = styled('div')`
  position:relative;

  p{
    margin-left:1rem;
  }
  text-align:center;
`;

S.StartButton = styled('div')`
  font-size: 2.5rem;
  right: 0;
  top: 0;
  margin: 1rem;
  text-align:center;
  padding: 2rem;
  position: absolute;
  border: 2px solid ${getColor('grey')};
  color: ${getColor('grey')};
    cursor: pointer;

  &:hover{
    border: 2px solid ${getColor('blue')};
    color: ${getColor('blue')};
  }
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

S.AvailableItem = styled('p')`
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
  const { updateText, restartGame, submitText, error } = useContext(StoreContext);

  const availableItems = [
    {
      value: '[',
      active: true
    },{
      value: ']',
      active: true
    },{
      value: 'A',
      active: true
    },{
      value: 'a',
      active: true
    },{
      value: '?',
      active: false
    },{
      value: '*',
      active: false
    },{
      value: '&',
      active: true
    },{
      value: '.',
      active: false
    },{
      value: '\\',
      active: false
    },{
      value: '/',
      active: false
    },
  ]

  return (
    <S.Footer>
      <Legend />
      <S.TextInput error={error} placeholder={'enter a regex and hit enter'} type="text" onChange={(e) => { updateText(e.target.value)}} onKeyDown={e => onKeyDown(e.key, e.target.value, submitText)} />
      <S.StartButton onClick={e => restartGame()}>{'RESTART'}</S.StartButton>
      <S.Available>
        <S.AvailableItem key={-1} active={false}>{'available: '}</S.AvailableItem>
        {availableItems.map((a,i) => (
          <S.AvailableItem key={i} active={a.active}>{a.value}</S.AvailableItem>
        ))}
      </S.Available>
    </S.Footer>
  );
}

export default Footer;
