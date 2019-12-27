import React from "react"
import stars from '../stars.png';
const electron = window.require("electron")


interface customProps {
}

const Main: React.FC<customProps> = (props) => {

  const ipcRenderer = electron.ipcRenderer;

  function togglePlay(str: string) {
    ipcRenderer.send('testing', str);
  }

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
          <button id="target" onClick={() => togglePlay('video_ss')}>Click to play</button>
        </header>
      </div>
    )
  }

  export default Main