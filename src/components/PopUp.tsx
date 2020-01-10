import React, {useEffect, useState } from "react";
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

    useEffect(()=>{
        
        ipcRenderer.on("paused",(_event: any,arg: any)=>{
            if(arg !== vidMap.get("countdown"))
              setVideoName(reverseMap.get(arg) + " is paused.");
            setButtonText("Play");
        }); 
    
        ipcRenderer.on("play",(_event: any,arg: any) => {
            if(arg !== vidMap.get("countdown"))
              setVideoName(reverseMap.get(arg) + " is playing.")
            setButtonText("Pause");
          });

        return () => {
          ipcRenderer.removeAllListeners("paused");
          ipcRenderer.removeAllListeners("play");
        };

      },[]);

    return(
        <div className="pop">
            <div>
            <p>{videoName}</p>
            <button onClick={()=>props.pauser()}>{buttonText}</button>
            <button onClick={()=>props.closer()}>Close</button>
            </div>
        </div>
    )
}

export default PopUp;