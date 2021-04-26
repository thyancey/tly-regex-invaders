
import { useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '../../util/theme';
import { StoreContext } from '../../store/context';

const S = {};
S.Legend = styled('div')`
  color: ${getColor('white')};
  font-size:1rem;
  li{
    display:block;
    text-align:left;
    padding-left:1rem;
  }

  ul{
    margin:0;
    padding:0;
  }

  text-align:left;

  position:absolute;
  left: 1rem;
  top: 1rem;
`;

S.StatsGroup = styled('div')`
  display:inline-block;
  border: 1px solid ${getColor('white')};
  padding:1rem;
  ${p => p.type === 'friendly' ? css`
    color: ${getColor('green')};
  `:css`
    color: ${getColor('red')};
  `}
`;
S.Entry = styled('li')`
  color: ${p => getColor(p.color)};
`;

const getStats = (entities, type, idxs1, idxs2) => {
  const subEntities = entities.filter(e => (e.type === type));
  return [
    subEntities.length,
    subEntities.filter(e => idxs1.includes(e.idx)).length,
    subEntities.filter(e => idxs2.includes(e.idx)).length
  ]
}

function StatsGroup({type, title, stats}){
  return (
    <S.StatsGroup type={type}>
      <h4>{title}</h4>
      <ul>
        <S.Entry color="white">{`alive: ${stats[0] - stats[2]} `}</S.Entry>
        <S.Entry color="white">{`targeted: ${stats[1]} `}</S.Entry>
        <S.Entry color="white">{`dead: ${stats[2]} `}</S.Entry>
      </ul>
    </S.StatsGroup>
  );
}

function Legend() {
  const { entities, matchedIdxs, killedIdxs } = useContext(StoreContext);

  const statsObj =  useMemo(() => {
    return {
      hostile: getStats(entities, 'hostile', matchedIdxs, killedIdxs),
      friendly: getStats(entities, 'friendly', matchedIdxs, killedIdxs)
    }
  }, [entities, matchedIdxs, killedIdxs]);

  return (
    <S.Legend>
      <StatsGroup type="hostile" title="Hostiles" stats={statsObj.hostile} />
      <StatsGroup type="friendly" title="Friendlies" stats={statsObj.friendly} />
    </S.Legend>
  );
}

export default Legend;
