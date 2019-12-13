import React from "react"
import video_rp from '../videos/ryan-pitts.mp4';


interface customProps {
    name: string;
    applyVid: boolean;
}

const Vid: React.FC<customProps> = (props) => {

    let conditionalVideo;

    if(props.applyVid) {
        conditionalVideo =<video controls>
            <source src={video_rp}/>
            </video>;
    } else {
        conditionalVideo = <p>{props.name}</p>
    }

    return(
        <div className="box">
        {conditionalVideo}
        </div>
    )
}

export default Vid;