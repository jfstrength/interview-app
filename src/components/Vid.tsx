import React from "react";
import vidMap from '../videos/vidMap';
const electron = window.require("electron");

interface customProps {
}

const Vid: React.FC<customProps> = (props) => {

    electron.ipcRenderer.on('reply',(event,arg) => {

        let item : HTMLVideoElement = document.getElementById("vidItem") as HTMLVideoElement;
        item.src = vidMap.get(arg);
        if(item.paused === true) {
            item.play(); 
        } else {
            item.pause();
        }
    })

    return(
        <div className="box">
            <video id="vidItem">
                <source src={vidMap.get("video_rp")}/>
            </video>
        </div>
    )
}

export default Vid;