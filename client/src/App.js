import logo from './logo.svg';
import './App.css';
import Machine from './components/Machine'
import Header from './components/Header'


function App() {
  return (
    <div className="App">
      <div className="container">
      <Header/>
        <Machine />
      </div>
    </div>
  );
}

export default App;
