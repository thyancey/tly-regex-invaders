import './App.css';
import Main from './components/main';
import Store from './store';

function App() {
  return (
    <Store>
      <Main/>
    </Store>
  );
}

export default App;
