import React, { useEffect, useState, useRef} from "react";
import vidMap from '../videos/vidMap';
const electron = window.require("electron");

// Video player element that renders in the second window

interface customProps {
}

const Vid: React.FC<customProps> = (props) => {

    const [source,setSource] = useState(vidMap.get("video_rp"));
    const vidRef = useRef<HTMLVideoElement>(null);

    electron.ipcRenderer.on('reply',(event,arg) => {
        setSource(vidMap.get(arg));
    });

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

    return(
        <div className="box">
            <video ref={vidRef} key={source} id="vidItem">
                <source src={source}/>
            </video>
        </div>
    )
}

export default Vid;