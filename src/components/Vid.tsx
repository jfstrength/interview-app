import React, { useState, useEffect } from "react"
import video_rp from '../videos/ryan-pitts.mp4';
//const electron = window.require("electron")


interface customProps {
}

const Vid: React.FC<customProps> = (props) => {

    const conditionalVideo = 
            <video controls>
            <source src={video_rp}/>
            </video>

    // electron.ipcRenderer.on('playit', (event: any, message: any) => {
    //     console.log(message)
    // })

    return(
        <div className="box">
        {conditionalVideo}
        </div>
    )
}

export default Vid;