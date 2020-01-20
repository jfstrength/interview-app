import React, { useEffect, useState, useRef} from "react";
import vidMap from "../videos/vidMap";
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

    return(
        <div className="box">
            <video className="player" onPause={tellPaused} onPlay={tellPlaying} ref={vidRef} key={source}>
                <source className="vidContent" src={source}/>
            </video>
        </div>
    )
}

export default Vid;