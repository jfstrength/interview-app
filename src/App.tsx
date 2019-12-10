import React from 'react';
// import logo from './logo.svg';
import stars from './stars.png';
import './App.css';
import vid from './videos/ryan-pitts.mp4';

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
        <video controls>
          <source src={vid}/>
        </video>
      </header>
    </div>
  );
}

export default App;
