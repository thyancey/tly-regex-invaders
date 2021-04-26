
import { useEffect, useContext, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../store/context';
import { getColor } from '../../util/theme';

import Enemy from './enemy';

const S = {};
S.Grid = styled('ul')`
  padding:0;
  margin:0;
`

S.Row = styled('div')`
  position:relative;
  height:7rem;
  margin-top:3rem;
`
function EnemyGrid({ matchString }) {
  const { getMatchedEnemies } = useContext(StoreContext);

  const enemyGrid = useMemo(() => {
    let retVal = [];
    getMatchedEnemies().forEach(e => {
      if(e.position.row >= retVal.length){
        retVal.push([e]);
      }else{
        retVal[e.position.row].push(e);
      }
    });
    return retVal.reverse();
  }, [getMatchedEnemies]);


  return (
    <S.Grid>
      { enemyGrid.map((eR, i) => (
        <S.Row key={`row-${i}`}>
          { eR.map((e, i) => (
            <Enemy 
              key={`enemy-${i}`} 
              text={e.text} 
              col={e.position.col} 
              row={e.position.row} 
              isMatched={e.isMatched} 
              isAttacked={e.isAttacked} />
          )) }
        </S.Row>
      )) }
    </S.Grid>
  );
}

export default EnemyGrid;
