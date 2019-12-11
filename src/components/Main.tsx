import React from "react"
import stars from '../stars.png';


function handleClick() {
    console.log("CLICKED");
  }

const Main: React.FC = () => {
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
              <td><button onClick={handleClick}>Click Here</button></td>
            </tr>
            </tbody>
          </table>
        </header>
      </div>
    )
  }

  export default Main