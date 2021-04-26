
import styled from 'styled-components';
import FriendliesGrid from './friendlies-grid';

const S = {};
S.Swarm = styled('div')`

  position:absolute;
  bottom:1rem;
  width:100%;

  >ul{
    padding:0;
    margin:0;
  }
`

function Friendlies() {

  return (
    <S.Swarm>
      <FriendliesGrid />
    </S.Swarm>
  );
}

export default Friendlies;
