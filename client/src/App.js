import './App.css';
import Machine from './components/Machine'
import Header from './components/Header'
import React from 'react';
import { positions, transitions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
};

const App = () => {
  return (
    <React.StrictMode>
      <Provider template={AlertTemplate} {...options}>
        <div className='App'>
          <div className='container'>
            <Header />
            <Machine />
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
