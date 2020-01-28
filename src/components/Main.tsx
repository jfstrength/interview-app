import React, { useState, useEffect } from "react"
import stars from "../stars.png";
import PopUp from "./PopUp";
import vidMap from "../videos/vidMap";
import reverseMap from "../videos/reverseMap";
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;

// Selection window rendered by the root route
// contains the user interface

interface customProps {
};

const Main: React.FC<customProps> = (_props) => {

  // whether to show the popUp or not
  const [popUp,setPopUp] = useState(false);
  // the path name of the current video
  const [currentVideo, setCurrentVideo] = useState(" ");
  // whether the popUp is for the current video or not
  const [match,setMatch] = useState(true);
  // primary text for the popUp
  const [popText, setPopText] = useState(" ");
  // playing status of the video
  const [playing, setPlaying] = useState(false);
  // whether to show the video or if not, show the countdown
  const [loaded, setLoaded] = useState(false);
  // where the popUp buttons route to
  const [target, setTarget] = useState(" ");

  // open a popUp (str == text name of the video)
  function showPopUp(str: string) {

    // Tell the popUp which video to load
    setTarget(str);
    
    // The video is already loaded
    if(currentVideo===vidMap.get(str)) {
      setLoaded(true);
      if(playing) {
        setPopText(str+" is playing.");
      } else {
        setPopText(str+" is paused.");
      }
      setPopUp(true);
      return;
    }

    // A different video is loaded
    if(currentVideo!==" " && currentVideo!== vidMap.get(str)) {
      setMatch(false);
      setPopUp(true);
      return;
    }

    // Initial loading
    if(currentVideo===" ") {
      ipcRenderer.send("playIt",str);
      return;
    }

  }

  // Switch videos
  function changeVideo(str:string) {
    closePop(vidMap.get(str));
    setPopUp(true);
    ipcRenderer.send("playIt",str);
    return;
  }

  // Close the popUp
  function closePop(str:string) {
    setMatch(true);
    setCurrentVideo(str);
    setPopUp(false);
   return;
  }

  // Pause the video (triggered from popUp)
  function pauseIt() {
    ipcRenderer.send("pauseIt");
    return;
  }
  
  // Set popUp timer (currently 60 seconds)
  useEffect(()=>{

      const timer = setTimeout(()=>{
        if(popUp===true) {
          setPopUp(false);
        }
      },60*1000);
    return () => {
      clearTimeout(timer);
    };
  },[popUp])

  // Subscribe to event listeners on mount and remove them on unmount
  useEffect(()=>{

    // Capture the playing status of the video
    // set the popUp if the video is playing
    // arg = [playing, source]
    ipcRenderer.on("statusMain",(_event: any,arg: any) => {
      setPlaying(arg[0]);
      setCurrentVideo(arg[1]);
      if(arg[0]===true) {
        setPopUp(true);
      }
    });

    // Remove listeners on unmount
    return()=> {
      ipcRenderer.removeAllListeners("statusMain");
    }

  },[]);

  useEffect(()=> {
    if(currentVideo===" ") {
      setPopUp(false);
    }
  },[currentVideo]);

  // output text of loaded status for header
  function loadText() {
    let str = reverseMap.get(currentVideo)
    if(str !== "Countdown" && str !== undefined) {
      return <p>Currently loaded: {reverseMap.get(currentVideo)}</p>
    } else {
      return null;
    }
  }

  function popSelector() {
    if(popUp) {
      return (  
          <div className="fade">       
          <PopUp target={target}
          changeVideo={changeVideo} playing={playing}
          ready={loaded} current={currentVideo} 
          vidText={popText} match={match}
          pauser={pauseIt} closer={closePop}/>
          </div> 
        )
    } else {
      return null;
    }
  }

  // Rendered Component 
  return (
    <div className="App">
      {popSelector()}
      <header className="App-header">
        <div className="image-holder">
        <img src={stars} className="App-logo" alt="logo" />
        </div>
        <p>
          Interview Database UI
        </p>
        {loadText()}
      </header>
      <div className="content">
        <div className="container">
          <h1>Ryan Pitts</h1>
          <button onClick={() => showPopUp("Ryan Pitts Interview")}>Click Here</button>
        </div>
        <div className="container">
          <h1>Sunset</h1>
          <button onClick={() => showPopUp("Sunset Interview")}>Click Here</button>
        </div>
      </div>
    </div>
    )
  }

  export default Main;