import logo from './logo.svg';
import './App.css';
import sharedUI from 'shared-ui'

function App() {
  const {Button, Header} = sharedUI
  return (
    <div className="App">
      <Header />
      <Button />
    </div>
  );
}

export default App;
