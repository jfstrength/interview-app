import React, { useState, useEffect } from "react"
import stars from "../stars.png";
import PopUp from "./PopUp";
import vidMap from "../videos/vidMap";
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;

// Selection window rendered by the root route
// contains the user interface

interface customProps {
};

const Main: React.FC<customProps> = (_props) => {

  const [popUp,setPopUp] = useState(false);
  const [current, setCurrent] = useState("blank");
  const [match,setMatch] = useState(true);
  const [vidName, setVidName] = useState("Your video is loading...");
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [target, setTarget] =useState("");

  let playPass = {
    str: "",
  };

  function togglePlay(str: string) {

    setTarget(str);
    
    // The video is already loaded
    if(current===vidMap.get(str)) {
      setReady(true);
      if(playing) {
        setVidName(str+" is playing.");
      } else {
        setVidName(str+" is paused.");
      }
      setPopUp(true);
      return;
    }

    // A different video is loaded
    if(current!=="blank" && current!== vidMap.get(str)) {
      setMatch(false);
      setVidName("Are you sure you want to change videos?");
      setPopUp(true);
      console.log("Toggle exit");
      return;
    }

    // Initial loading
    if(current==="blank") {
      playPass.str=str;
      ipcRenderer.send("playit",playPass);
      return;
    }

  };

  function changeVideo(str:string) {
    closePop(vidMap.get(str));
    setVidName("Your video is loading...");
    ipcRenderer.send("log","ready: "+ready);
    ipcRenderer.send("log","popUp: "+popUp);
    setReady(false);
    setPopUp(true);
    ipcRenderer.send("log","ready: "+ready);
    ipcRenderer.send("log","popUp: "+popUp);
    playPass.str=str;
    ipcRenderer.send("playit",playPass);
    return;
  }

  function closePop(name:string) {
    setMatch(true);
    setCurrent(name);
    setPopUp(false);
    return;
  }

  function pauseIt() {
    ipcRenderer.send("pause");
    return;
  }

  // Set popUp timer (currently 60 seconds)
  useEffect(()=>{
      const timer = setTimeout(()=>{
        if(popUp===true) {
          setPopUp(false);
        }
      },60*1000);
    return () => clearTimeout(timer);
  },[popUp])

  // Subscribe to event listeners on mount and remove them on unmount
  useEffect(()=>{

    ipcRenderer.on("status",(_event: any,arg: any) => {
      setPlaying(arg);
    });

    ipcRenderer.on("play",(_event: any,_arg: any) => {
      setPopUp(true);
    });

    return()=> {
      ipcRenderer.removeAllListeners("status");
      ipcRenderer.removeAllListeners("play");
    }

  },[]);

  return (
    <div className="App">
      {popUp ?  <PopUp target={target} changeVideo={changeVideo} playing={playing} ready={ready} current={current} vidName={vidName} match={match} pauser={pauseIt} closer={closePop}/> : null}
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
          <button onClick={() => togglePlay("Ryan Pitts Interview")}>Click Here</button>
        </div>
        <div className="container">
          <h1>Sunset</h1>
          <button onClick={() => togglePlay("Sunset Interview")}>Click Here</button>
        </div>
      </div>
    </div>
    )
  };

  export default Main;