import React, {useEffect, useState} from "react";
import reverseMap from "../videos/reverseMap";
import vidMap from "../videos/vidMap";
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;

interface customProps {
    closer: Function;
    pauser: Function;
    match: boolean;
    vidName: string;
    current: string;
    ready: boolean;
    playing: boolean;
    changeVideo: Function;
    target: string;
}

const PopUp : React.FC<customProps> = (props) => {

    const[videoName,setVideoName]=useState(props.vidName);
    const[current,setCurrent]=useState(props.current);
    const[buttonText,setButtonText]=useState(props.playing ? "Pause" : "Play");
    const[ready, setReady]=useState(props.ready);

    useEffect(()=>{
        
        ipcRenderer.on("paused",(_event: any,arg: any)=>{
            if(arg !== vidMap.get("Countdown")) {
              setCurrent(arg);
              setVideoName(reverseMap.get(arg) + " is paused.");
            }
            setButtonText("Play");
        }); 
    
        ipcRenderer.on("play",(_event: any,arg: any) => {
            if(arg !== vidMap.get("Countdown")) {
              setCurrent(arg);
              setVideoName(reverseMap.get(arg) + " is playing.");
              setReady(true);
            } else {
            setReady(false);
            }
            setButtonText("Pause");
          });

        return () => {
          ipcRenderer.removeAllListeners("paused");
          ipcRenderer.removeAllListeners("play");
        };

      },[]);

      function selector() {
        if(ready && props.match) {
          return <div className="buttons"> 
          <button onClick={()=>props.pauser()}>{buttonText}</button>
          <button onClick={()=>props.closer(current)}>Keep browsing</button>
          </div>;
        }

        if(!props.match) {
          return <div className="buttons">
          <button onClick={()=>props.changeVideo(props.target)}>Change Video</button> 
          <button onClick={()=>props.closer(current)}>Keep browsing</button>
          </div>
        }

        return null;
      }

    return(
        <div className="pop">
            <div>
              <p>{videoName}</p>
              {selector()}
              </div>
            </div>
    )
};

export default PopUp;