
import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../store/context';
import { ENTITY_WIDTH, ENEMIES_PER_ROW } from '../../util';

import Entity from './entity';
const SPACER_WIDTH = 50;

const S = {};
S.Grid = styled('ul')`
  padding:0;
  margin:0;
`

const getGridPosition = (idx, perRow = 3) => {
  return {
    row: Math.floor(idx / perRow),
    column: idx % perRow
  }
}

S.Row = styled('div')`
  position:relative;
  height:7rem;
  margin-top:3rem;
`
function EnemyGrid({ matchString }) {
  const { getMatchedEntities } = useContext(StoreContext);

  const enemyGrid = useMemo(() => {
    let retVal = [];
    getMatchedEntities('hostile').forEach(e => {
      const position = getGridPosition(e.posIdx, ENEMIES_PER_ROW)
      if(position.row >= retVal.length){
        retVal.push([{
          ...e,
          row: position.row,
          column: position.column
        }]);
      }else{
        retVal[position.row].push({
          ...e,
          row: position.row,
          column: position.column
        });
      }
    });

    return retVal.reverse();
  }, [getMatchedEntities]);


  return (
    <S.Grid>
      { enemyGrid.map((eR, i) => (
        <S.Row key={`row-${i}`}>
          { eR.map((e, i) => (
            <Entity 
              key={`enemy-${i}`} 
              type="hostile"
              text={e.text} 
              idx={e.idx}
              column={e.column}
              posIdx={e.posIdx}
              givenStyle={{
                marginLeft: i !== 0 ? SPACER_WIDTH : null,
                width: ENTITY_WIDTH 
              }}
              isMatched={e.isMatched} 
              isAttacked={e.isAttacked}
              isKilled={e.isKilled} />
          )) }
        </S.Row>
      )) }
    </S.Grid>
  );
}

export default EnemyGrid;
