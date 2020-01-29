import React, { useEffect, useState, useRef} from "react";
import vidMap from "../videos/vidMap";
import stars from "../stars.png";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

// Video player element that renders in the second window

interface customProps {
}

const Vid: React.FC<customProps> = (_props) => {

    // the path name of the current video
    const [source,setSource] = useState(" ");
    // playing status of the video
    const [playing,setPlaying] = useState(false);
    // use a reference to trigger the play() method
    const vidRef = useRef<HTMLVideoElement>(null);
    //
    const [fadeOut,setFadeOut] = useState(false);

    // notify the UI that the video is playing
    function tellPlaying() {
        setPlaying(true);
    }

    // notify the Ui that the video is paused
    function tellPaused() {
        setPlaying(false);
    }

    // Subscribe to event listeners on mount and remove them on unmount
    useEffect(()=>{

        // when told to load a new Video, load it and countdown
        ipcRenderer.on("playIt",(_event: any,arg: any) => {
            setSource(vidMap.get("Countdown"));
            if(vidRef.current) {
                vidRef.current.play();
                vidRef.current.onended = () => {
                    setSource(vidMap.get(arg));
                    if(vidRef.current) {
                    vidRef.current.play();
                    }
                }
            }
        });

        // when told to pause or play, change the video as needed
        ipcRenderer.on("pauseIt",(_event: any,_arg: any)=>{
            if(vidRef.current) {
                if(vidRef.current.paused) {
                    vidRef.current.play();
                } else {
                    vidRef.current.pause();
                }
            }
        });

        // remove event listeners on unmount
        return () => {
          ipcRenderer.removeAllListeners("playIt");
          ipcRenderer.removeAllListeners("pauseIt");
        };
      },[]);

      // notify UI of video paused status
      useEffect(()=>{
        ipcRenderer.send("status",[playing,source]);
      },[playing,source]);

      // set a timer for the default screen
      useEffect(()=>{
        const timer = setTimeout(()=>{
            if(playing===false) {
                if(source!==" " && source !== vidMap.get("Countdown")) {
                    setSource(" ");
                }
            }
        },5*60*1000);

        return () => {
            clearTimeout(timer)
        }
      },[source,playing])

      useEffect(()=>{
          if(playing) {
          setFadeOut(true)
          setTimeout(()=>{
            setFadeOut(false);
          },0.5*1000)
        }
      },[playing])

      // Choose either the default screen or the video player
      function defaultSelector() {
          if(source===" ") {
              return (<div><img src={stars} className="App-logo" alt="logo" />
              <h1>Please use the kiosk to load an interview.</h1></div>)
          } else return (
          <video className="player" onPause={tellPaused} onPlay={tellPlaying} ref={vidRef} key={source}>
          <source className="vidContent" src={source}/>
          </video>);
      }

      //
      function popSelector() {
          if(!playing && source!==" " && source!==vidMap.get("Countdown")) {
              return (
                  <div className={fadeOut ? "pop fadeOut" : "pop fadeIn"}><div><p>PAUSED</p></div></div>
              )
          } else return null;
      }

    return(
        <div className="box">
            {defaultSelector()}
            {popSelector()}
        </div>
    )
}

export default Vid;