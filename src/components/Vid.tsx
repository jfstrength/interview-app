import React, {useState} from "react"
import video_rp from '../videos/ryan-pitts.mp4';
const electron = window.require("electron")

interface customProps {
}

const Vid: React.FC<customProps> = (props) => {

    electron.ipcRenderer.on('reply',(event,args) => {
        console.log("unique");
        let item : HTMLVideoElement = document.getElementById("vidItem") as HTMLVideoElement;
        setStr("video_rp");
        if(item.paused === true) {
            item.play(); 
        } else {
            item.pause();
        }
    })

    const [str, setStr] = useState("");

    return(
        <div className="box">
            <video id="vidItem">
                <source src={str}/>
            </video>
        </div>
    )
}

export default Vid;