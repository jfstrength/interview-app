import React, {useState} from "react"
import stars from '../stars.png';

interface Custom {
  handler: Function;
}

const Main: React.FC<Custom> = (props) => {

  return (
    <div className="App">
        <header className="App-header">
          <img src={stars} className="App-logo" alt="logo" />
          <p>
            Interview Database Entry
          </p>
          <p>
            Version 0.1.10
          </p>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Conflict</th>
              <th>Bio</th>
              <th>Interview</th>
            </tr>
            </thead>
            <tbody>
            <tr>  
              <td>Ryan Pitts</td>
              <td></td>
              <td></td>
              <td><button>Click Here</button></td>
            </tr>
            </tbody>
          </table>
          <button onClick={props.handler()}>Click to play</button>
        </header>
      </div>
    )
  }

  export default Main