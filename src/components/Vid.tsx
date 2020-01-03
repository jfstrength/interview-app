import React, { useEffect, useState, useRef} from "react";
import vidMap from '../videos/vidMap';
const electron = window.require("electron");

// Video player element that renders in the second window

interface customProps {
}

const ipcRenderer = electron.ipcRenderer;

const Vid: React.FC<customProps> = (props) => {

    const [source,setSource] = useState(vidMap.get("video_rp"));
    const vidRef = useRef<HTMLVideoElement>(null);

    function tellPlaying() {
        ipcRenderer.send('playing',source);
    }

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

        ipcRenderer.on('reply',(event,arg) => {
            setSource(vidMap.get(arg));
        });

        ipcRenderer.on('pauseIt',(event,arg)=>{
            if(vidRef.current && !vidRef.current.paused)
            vidRef.current.pause();
        });

        return () => {
          ipcRenderer.removeAllListeners('reply');
          ipcRenderer.removeAllListeners('pauseIt');
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