import React, { useState, useEffect } from "react"
import video_rp from '../videos/ryan-pitts.mp4';
import { parentPort } from "worker_threads";
import { prependOnceListener } from "cluster";


interface customProps {
    vidStatus: boolean;
}

const Vid: React.FC<customProps> = (props) => {

    let conditionalVideo;

    const[check, setCheck] = useState(props.vidStatus);
    
    if(check) {
        conditionalVideo =<video controls>
            <source src={video_rp}/>
            </video>;
    } else {
        conditionalVideo = <p>Video set not to load.</p>
    }

    return(
        <div className="box">
        {conditionalVideo}
        </div>
    )
}

export default Vid;