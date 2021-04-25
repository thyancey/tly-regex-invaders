
import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { getColor } from '../util/theme';
import { StoreContext } from '../store/context';
import Legend from './legend';

const S = {};
S.Footer = styled('div')`
  border: 4px dashed blue;

  position:absolute;
  left:0;
  right:0;
  bottom:0;
  height: 10rem;

  p{
    margin-left:1rem;
  }
`;

S.StartButton = styled('div')`
  width: 20%;
  height: 4rem;
  right: 0;
  top: 0;
  margin: 1rem;
  text-align:center;
  padding: 1rem;
  position: absolute;
  background-color: ${getColor('red')};
  color:white;
  border-radius: 1rem;
`;

S.TextInput = styled('input')`
  height:4rem;
  width: 75%;
  margin: 1rem;
  color:  ${getColor('black')};
  background: ${getColor('blue')};

  font-size:2rem;
  padding:1rem;

  ::placeholder{
    color:white;
  }
`;

S.Output = styled('p')`
  color: white;
`;

S.OutputError = styled('p')`
  color: ${getColor('red')}
`;

const onKeyDown = (key, value, submitText) => {
  if(key === 'Enter'){
    submitText(value);
  }
}

function Footer({ matchString }) {
  const { text, updateText, restartGame, submitText, error } = useContext(StoreContext);

  const outputDom = useMemo(() => {
    if(error){
      return <S.OutputError>{`invalid: / ${error} /`}</S.OutputError>;
    }else if(text){
      return <S.Output>{`/ ${text} /`}</S.Output>
    }else{
      return <S.Output>{`/ /`}</S.Output>
    }
  }, [text, error]);

  return (
    <S.Footer>
      <S.TextInput placeholder={'enter a regex and hit enter'} type="text" onChange={(e) => { updateText(e.target.value)}} onKeyDown={e => onKeyDown(e.key, e.target.value, submitText)} />
      <S.StartButton onClick={e => restartGame()}>{'restart'}</S.StartButton>
      <S.Output>
        {outputDom}
      </S.Output>
      <Legend />
    </S.Footer>
  );
}

export default Footer;
