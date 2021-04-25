import logo from './logo.svg';
import './App.css';
import Enemies from './components/enemies';
import Footer from './components/footer';

import styled from 'styled-components';
import Store from './store';

const S = {};
S.Bg = styled('div')`
  background-color: black;

  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
`

function App() {
  return (
    <S.Bg>
      <Store>
        <Enemies/>
        <Footer/>
      </Store>
    </S.Bg>
  );
}

export default App;
