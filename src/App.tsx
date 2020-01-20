import React from "react";
import "./App.css";
import Vid from "./components/Vid";
import Main from "./components/Main";
import {useRoutes} from "hookrouter";

// Functional component which renders either the video player or the 
// selection screen depending on which route is selected by Electron

const App: React.FC = (props) => {

  const routes = {
    "/": () => <Main/>,
    "/vid": () => <Vid/>
  };

  const routeResult = useRoutes(routes)

  return (
      routeResult
  );

}

export default App;
