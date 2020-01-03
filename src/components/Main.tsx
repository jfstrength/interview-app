import React, { useState, useEffect } from "react"
import stars from '../stars.png';
import reverseMap from '../videos/reverseMap';
import PopUp from './PopUp';
const electron = window.require("electron")

// Selection window rendered by the root route
// contains the user interface

interface customProps {
};

const ipcRenderer = electron.ipcRenderer;

const Main: React.FC<customProps> = (props) => {

  const [popUp,setPopUp] = useState(false);
  const [vidName,setVidName] = useState("Nothing");

  function togglePlay(str: string) {
    ipcRenderer.send('testing', str);
    setVidName("Your video is loading...");
    setPopUp(true);
  };

  function closePop() {
    setPopUp(false);
  };

  function pauseIt() {
    ipcRenderer.send('pause');
  }

  useEffect(()=>{
    ipcRenderer.on('play',(event,arg) => {
      setVidName(reverseMap.get(arg)+" is playing!")
      setPopUp(true);
    });
    return () => {
      ipcRenderer.removeAllListeners('play');
    };
  },[]);

  return (
    <div className="App">
      {popUp ?  <PopUp pauser={pauseIt} closer={closePop} vidName={vidName}/> : null}
      <header className="App-header">
        <img src={stars} className="App-logo" alt="logo" />
        <p>
          Interview Database UI
        </p>
      </header>
      <div className="content">
        <div className="container">
          <h1>Ryan Pitts</h1>
          <button onClick={() => togglePlay('video_rp')}>Click Here</button>
        </div>
        <div className="container">
          <h1>Sunset</h1>
          <button onClick={() => togglePlay('video_ss')}>Click Here</button>
        </div>
      </div>
    </div>
    )
  };

  export default Main;