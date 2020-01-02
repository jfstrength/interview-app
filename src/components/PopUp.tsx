import React from 'react';

interface customProps {
    handler: Function;
    vidName: string;
}

const PopUp : React.FC<customProps> = (props) => {

    return(
        <div className="pop">
            <div>
            <p>{props.vidName}</p>
            <button onClick={()=>props.handler()}>Close</button>
            </div>
        </div>
    )
}

export default PopUp;