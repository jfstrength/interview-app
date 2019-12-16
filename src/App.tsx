import React, {useState, useRef, useImperativeHandle} from 'react';
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

  const[source, setSource] = useState(false);

  function handleSource() {
    setSource(!source);
    console.log("Source is now:" + source);
  }

  return (
    <Router>
      <Switch>
        <Route path="/main"
        render = {(props) => <Main {...props}
        handler = {handleSource}
        />} /> 
        <Route path="/vid" 
        render = {(props) => <Vid {...props}
        vidStatus = {source}
        />} />
      </Switch>
    </Router>
  );
}

export default App;
