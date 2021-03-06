import React, { useEffect, useState, useRef} from "react";
import vidMap from "../videos/vidMap";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

// Video player element that renders in the second window

interface customProps {
}

const Vid: React.FC<customProps> = (_props) => {

    const [source,setSource] = useState("");
    const vidRef = useRef<HTMLVideoElement>(null);

    function tellPlaying() {
        ipcRenderer.send("playing",source);
        ipcRenderer.send("status",true);
    };

    function tellPaused() {
        ipcRenderer.send("paused",source);
        ipcRenderer.send("status",false);
    };

    // Subscribe to event listeners on mount and remove them on unmount
    useEffect(()=>{

        ipcRenderer.on("reply",(_event: any,arg: any) => {

            setSource(vidMap.get("Countdown"));
            if(vidRef.current) {
                vidRef.current.play();
                vidRef.current.onended = () => {
                    setSource(vidMap.get(arg.str));
                    if(vidRef.current) {
                    vidRef.current.play();
                    }
                }
            }
        });

        ipcRenderer.on("pauseIt",(_event: any,_arg: any)=>{
            if(vidRef.current) {
                if(vidRef.current.paused) {
                    vidRef.current.play();
                } else {
                    vidRef.current.pause();
                }
            }
        });

        return () => {
          ipcRenderer.removeAllListeners("reply");
          ipcRenderer.removeAllListeners("pauseIt");
        };
      },[]);

      let paused = vidRef.current?.paused;

      useEffect(()=>{
        ipcRenderer.send("status",!vidRef.current?.paused);
      },[paused]);



    return(
        <div className="box">
            <video className="player" onPause={tellPaused} onPlay={tellPlaying} ref={vidRef} key={source}>
                <source className="vidContent" src={source}/>
            </video>
        </div>
    )
}

export default Vid;