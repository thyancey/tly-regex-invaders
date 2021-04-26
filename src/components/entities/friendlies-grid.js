
import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../store/context';
import { ENTITY_WIDTH, FRIENDLIES_PER_ROW } from '../../util';

import Entity from './entity';

const S = {};
S.Grid = styled('div')`
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
  margin-top:1rem;

  display:flex;
  justify-content: space-evenly; 
  >div{

  }
`
function FriendliesGrid({ matchString }) {
  const { getMatchedEntities } = useContext(StoreContext);

  const sortedGrid = useMemo(() => {
    let retVal = [];
    getMatchedEntities('friendly').forEach(e => {
      const position = getGridPosition(e.posIdx, FRIENDLIES_PER_ROW)
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

      { sortedGrid.map((eR, i) => (
        <S.Row key={`row-${i}`}>
          { eR.map((e, i) => (
            <Entity 
              key={`friendly-${i}`} 
              type={e.type}
              text={e.text} 
              idx={e.idx}
              posIdx={e.posIdx}
              givenStyle={{
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

export default FriendliesGrid;
