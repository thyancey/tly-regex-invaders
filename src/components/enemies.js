
import { useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../store/context';
import { generateRandomTextEntries } from '../util';
import { getColor } from '../util/theme';

import Enemy from './enemy';

const S = {};
S.Swarm = styled('div')`
  border: 4px solid white;

  position:absolute;
  left:50%;
  width:75%;
  top:10px;
  transform: translateX(-50%);

  color:white;
`

S.ActiveText = styled('p')`
  color: ${getColor('purple')};
  text-align:center;
  
`

function Enemies({ matchString }) {
  // const [enemies, setEnemies] = useState([]);
  const { enemies, matchedIdxs, getMatchedEnemies, activeText } = useContext(StoreContext);
/*
  useEffect(() => {
    if(enemies.length === 0){
      setEnemies(generateRandomTextEntries(10));
    }
  }, [ enemies, setEnemies ]);
*/
  // useEffect(() => {
  //   console.log('matchString', matchString);
  // }, [ matchString ]);

  return (
    <S.Swarm>
      <ul>
        { getMatchedEnemies().map((e, i) => (
          <Enemy key={i} text={e.text} isMatched={e.isMatched} isAttacked={e.isAttacked} />
        )) }
      </ul>
      {activeText && (
        <S.ActiveText>{`ATTACKING: "${activeText}"`}</S.ActiveText>
      )}
    </S.Swarm>
  );
}

export default Enemies;
