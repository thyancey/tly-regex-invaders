import styled from 'styled-components';
import { getColor } from '../util/theme';

import Enemies from './entities/enemies';
import Friendlies from './entities/friendlies';
import Footer from './footer';
import Bg from './bg';

const S = {};
S.Main = styled('div')`
  overflow:hidden;

  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;

  display: grid;
  grid-template-columns: [col] 5rem [col] auto [col] 5rem;
  grid-template-rows: [row] auto [row] 30% [row] 10rem;
`

S.Hostiles = styled('div')`
  grid-column: col 1 / span 3;
  grid-row: row 1 / span 1 ;

  ${'' /* border: 2px solid red; */}
  border-bottom: 4px dashed ${getColor('red')}
`
S.Friendlies = styled('div')`
  grid-column: col 1 / span 3;
  grid-row: row 2 / span 1 ;
  border-bottom: 4px dashed ${getColor('green')};

  position:relative;
  
  ${'' /* border: 2px solid green; */}
`
S.Input = styled('div')`
  grid-column: col 1 / span 3;
  grid-row: row 3 / span 1 ;
  background-color: ${getColor('black')};
`

S.Bg = styled('div')`
  grid-column: col 1 / span 3;
  grid-row: row 1 / span 2 ;
  z-index:-1;
`

function Main() {
  return (
    <S.Main >
      <S.Hostiles>
        <Enemies/>
      </S.Hostiles>
      <S.Friendlies>
        <Friendlies/>
      </S.Friendlies>
      <S.Input>
        <Footer/>
      </S.Input>
      <S.Bg>
        <Bg/>
      </S.Bg>
    </S.Main>
  );
}

export default Main;
