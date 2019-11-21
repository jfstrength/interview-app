import React from 'react';
// import logo from './logo.svg';
import stars from './stars.png';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={stars} className="App-logo" alt="logo" />
        <p>
          Interview Database Entry
        </p>
        <p>
          Version 0.1.10
        </p>
      </header>
    </div>
  );
}

export default App;
