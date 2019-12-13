import React, {useState} from 'react';
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

const App: React.FC = (props) => {

var source: boolean = false;

  return (
    <Router>
      <Switch>
        <Route path="/main"
        render = {(props) => <Main {...props}/>} /> 
        <Route path="/vid" 
        render = {(props) => <Vid {...props} 
        name={"Video set not to load."}
        applyVid={source} />} />
      </Switch>
    </Router>
  );
}

export default App;
