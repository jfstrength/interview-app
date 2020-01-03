import React, { useEffect, useState, useRef} from "react";
import vidMap from "../videos/vidMap";
const electron = window.require("electron");

// Video player element that renders in the second window

interface customProps {
}

const ipcRenderer = electron.ipcRenderer;

const Vid: React.FC<customProps> = (_props) => {

    const [source,setSource] = useState(vidMap.get("video_rp"));
    const vidRef = useRef<HTMLVideoElement>(null);

    function tellPlaying() {
        ipcRenderer.send("playing",source);
    }

    // Subscribe to event listeners on mount and remove them on unmount
    useEffect(()=> {
        const timer = setInterval(() => {
                if(vidRef.current) {
                    if(vidRef.current.paused) {
                        vidRef.current.play();
                    }
                }
            }, 10*1000);
        return () => clearInterval(timer);
    },[source]);

    useEffect(()=>{

        ipcRenderer.on("reply",(_event: any,arg: any) => {
            setSource(vidMap.get(arg));
        });

        ipcRenderer.on("pauseIt",(_event: any,_arg: any)=>{
            if(vidRef.current && !vidRef.current.paused) {
            vidRef.current.pause();
            }
        });

        return () => {
          ipcRenderer.removeAllListeners("reply");
          ipcRenderer.removeAllListeners("pauseIt");
        };
      },[]);


    return(
        <div className="box">
            <video className="player" onPlay={tellPlaying} ref={vidRef} key={source}>
                <source className="vidContent" src={source}/>
            </video>
        </div>
    )
}

export default Vid;