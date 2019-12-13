import React, {useState} from "react"
import stars from '../stars.png';

interface Custom {

}

const Main: React.FC<Custom> = (props) => {

  function handleClick() {
    console.log("CLICKED");
    setCount(count+1);
  }

  const [count, setCount] = useState(0);

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
          <p> You have clicked the button {count} times!</p>
        </header>
      </div>
    )
  }

  export default Main