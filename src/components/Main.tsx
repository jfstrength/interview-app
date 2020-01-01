import React from "react"
import stars from '../stars.png';
const electron = window.require("electron")

// Selection window rendered by the root route
// contains the user interface

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
          Interview Database UI
        </p>
      </header>
      <div className="content">
        <div className="container">
          <h1>Ryan Pitts</h1>
          <button onClick={() => togglePlay('video_rp')}>Click Here</button>
        </div>
        <div className="container">
          <h1>Sunset</h1>
          <button onClick={() => togglePlay('video_ss')}>Click Here</button>
        </div>
      </div>
    </div>
    )
  }

  export default Main