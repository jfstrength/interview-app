import React from 'react';

interface customProps {
    closer: Function;
    pauser: Function;
    vidName: string;
}

const PopUp : React.FC<customProps> = (props) => {

    return(
        <div className="pop">
            <div>
            <p>{props.vidName}</p>
            <button onClick={()=>props.pauser()}>Pause</button>
            <button onClick={()=>props.closer()}>Close</button>
            </div>
        </div>
    )
}

export default PopUp;