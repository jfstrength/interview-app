import React, { useState, useEffect } from "react"
import stars from "../stars.png";
import PopUp from "./PopUp";
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;

// Selection window rendered by the root route
// contains the user interface

interface customProps {
};


const Main: React.FC<customProps> = (_props) => {

  const [popUp,setPopUp] = useState(false);

  function togglePlay(str: string) {
    ipcRenderer.send("testing", str);
    setPopUp(true);
  };

  function closePop() {
    setPopUp(false);
  };

  function pauseIt() {
    ipcRenderer.send("pause");
  };

  // Subscribe to event listeners on mount and remove them on unmount
  useEffect(()=>{

    ipcRenderer.on("playPop",(_event: any,_arg: any) => {
      setPopUp(true);
    });

    return()=> {
      ipcRenderer.removeAllListeners("playPop");
    }

  },[]);

  return (
    <div className="App">
      {popUp ?  <PopUp pauser={pauseIt} closer={closePop}/> : null}
      <header className="App-header">
        <div className="image-holder">
        <img src={stars} className="App-logo" alt="logo" />
        </div>
        <p>
          Interview Database UI
        </p>
      </header>
      <div className="content">
        <div className="container">
          <h1>Ryan Pitts</h1>
          <button onClick={() => togglePlay("video_rp")}>Click Here</button>
        </div>
        <div className="container">
          <h1>Sunset</h1>
          <button onClick={() => togglePlay("video_ss")}>Click Here</button>
        </div>
      </div>
    </div>
    )
  };

  export default Main;