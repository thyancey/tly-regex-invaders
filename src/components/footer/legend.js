
import { useContext } from 'react';
import styled from 'styled-components';
import { getColor } from '../../util/theme';
import { StoreContext } from '../../store/context';

const S = {};
S.Legend = styled('div')`
  color: ${getColor('white')};
  font-size:1rem;
  li{
    display:block;
  }

  position:absolute;
  left: 1rem;
  top: 1rem;
  padding: 1rem;
  border: 1px solid white;
`;

S.Untargeted = styled('li')`
  color: ${getColor('red')};
`;
S.Targeted = styled('li')`
  color: ${getColor('blue')};
`;
S.Attacked = styled('li')`
  color: ${getColor('grey')};
`;

function Legend({ matchString }) {
  const { enemies, matchedIdxs, attackedIdxs } = useContext(StoreContext);

  return (
    <S.Legend>
      <S.Untargeted>{`untargeted: ${ enemies.length - matchedIdxs.length }`}</S.Untargeted>
      <S.Targeted>{`targeted: ${matchedIdxs.length}`}</S.Targeted>
      <S.Attacked>{`attacked: ${attackedIdxs.length}`}</S.Attacked>
    </S.Legend>
  );
}

export default Legend;
