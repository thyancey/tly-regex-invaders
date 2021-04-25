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

  h1{
    color:white;
    font-size:15rem;
    opacity:.05;

    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;

    word-break: break-all;
  }
`

function App() {
  return (
    <S.Bg>
      <Store>
        <h1>{'/Regex!nv@ders/'}</h1>
        <Enemies/>
        <Footer/>
      </Store>
    </S.Bg>
  );
}

export default App;
