import React from 'react';
import './App.css';
import Vid from './components/Vid';
import Main from './components/Main';
import video_rp from './videos/ryan-pitts.mp4';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  }
  from "react-router-dom";

{/* <video controls>
<source src={video_rp}/>
</video> */}

const App: React.FC = () => {

  return (
    <Router>
      <Switch>
        <Route path="/main">
          <Main/>
        </Route>
      </Switch>
        <Route path="/vid">
          <Vid></Vid>
        </Route>
    </Router>
  );
}


export default App;
