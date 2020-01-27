import React, {useEffect, useState} from "react";
import reverseMap from "../videos/reverseMap";
import vidMap from "../videos/vidMap";
import {CSSTransition} from "react-transition-group";
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;

interface customProps {
    closer: Function;
    pauser: Function;
    match: boolean;
    vidText: string;
    current: string;
    ready: boolean;
    playing: boolean;
    changeVideo: Function;
    target: string;
}

const PopUp : React.FC<customProps> = (props) => {
    
    // primary text for the popUp
    const[videoText,setVideoText]=useState(props.vidText);
    // the path name of the current video
    const[current,setCurrent]=useState(props.current);
    // text for the primary button
    const[buttonText,setButtonText]=useState(props.playing ? "Pause" : "Play");
    // whether to show the video or if not, show the countdown
    const[ready, setReady]=useState(props.ready);
    // state which triggers animation on change
    const[doneWaiting, setDoneWaiting]=useState(false);

    // Subscribe to event listeners on mount and remove them on unmount
    useEffect(()=>{


      // When the video plays, change the text to reflect
      // arg = [playing, source]
      ipcRenderer.on("statusPop",(_event: any,arg: any) => {
        if(arg[0]===false) {
          if(arg[1] !== vidMap.get("Countdown")) {
            setCurrent(arg[1]);
            setVideoText(reverseMap.get(arg[1]) + " is paused.");
          }
          setButtonText("Play");
        } else {
          if(arg[1] !== vidMap.get("Countdown")) {
            setCurrent(arg[1]);
            setVideoText(reverseMap.get(arg[1]) + " is playing.");
            setReady(true);
          } else {
            setReady(false);
          }
          setButtonText("Pause");
        }
        });

        // Remove event listers on unmount
        return () => {
          ipcRenderer.removeAllListeners("statusPop");
        };

      },[]);

      // trigger the fade animation on entrance
      useEffect(()=>{
        setDoneWaiting(true);
      },[]);

      // Make sure the loading text is correct
      useEffect(()=>{
        if(!props.match){
          setVideoText("Are you sure you want to change videos?");
          return;
        }
        if(!ready){
          setVideoText("Your video is loading...");
          return;
        }
      },[props.match, ready]);

      // Determine which type of popUp to render
      function buttonSelector() {

        // popUp for an already playing video
        if(ready && props.match) {
          return <div className="buttons"> 
          <button onClick={()=>props.pauser()}>{buttonText}</button>
          <button onClick={()=>props.closer(current)}>Keep browsing</button>
          </div>;
        }

        // popUp for a different video
        if(!props.match) {
          return <div className="buttons">
          <button onClick={()=>props.changeVideo(props.target)}>Change Video</button> 
          <button onClick={()=>props.closer(current)}>Keep browsing</button>
          </div>
        }

        return null;
      }

    // Rendered component
    return(
      <div className="pop">
        <CSSTransition mountOnEnter in={doneWaiting} timeout={400} classNames="fader">
          <div key="fade">
            <p>{videoText}</p>
            {buttonSelector()}
          </div>
        </CSSTransition>
      </div> 
        )
}

export default PopUp;