import React, {useEffect, useState, useRef } from "react";
import reverseMap from "../videos/reverseMap";
import vidMap from "../videos/vidMap";
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;

interface customProps {
    closer: Function;
    pauser: Function;
}

const PopUp : React.FC<customProps> = (props) => {

    const[videoName,setVideoName]=useState("Your video is loading...");
    const[buttonText,setButtonText]=useState("Pause");
    const[ready, setReady]=useState(false);

    useEffect(()=>{
        
        ipcRenderer.on("paused",(_event: any,arg: any)=>{
            if(arg !== vidMap.get("countdown"))
              setVideoName(reverseMap.get(arg) + " is paused.");
            setButtonText("Play");
        }); 
    
        ipcRenderer.on("play",(_event: any,arg: any) => {
            if(arg !== vidMap.get("countdown")) {
              setVideoName(reverseMap.get(arg) + " is playing.");
              setReady(true);
            }
            setButtonText("Pause");
          });

        return () => {
          ipcRenderer.removeAllListeners("paused");
          ipcRenderer.removeAllListeners("play");
        };

      },[]);

      const buttonsRef = useRef<HTMLDivElement>(null);

    return(
        <div className="pop">
            <div>
              <p>{videoName}</p>
              {ready ? 
              <div ref={buttonsRef} className="buttons"> 
                  <button onClick={()=>props.pauser()}>{buttonText}</button>
                  <button onClick={()=>props.closer()}>Keep browsing</button>
              </div>
                : null}
              </div>
            </div>
    )
}

export default PopUp;