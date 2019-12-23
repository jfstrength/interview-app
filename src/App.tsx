import React, { useState, useEffect } from 'react';
import './App.css';
import Vid from './components/Vid';
import Main from './components/Main';
import {useRoutes} from 'hookrouter';
//import {mainWindow, secondWindow} from './electron'
//import fs from 'fs'
//const electron = window.require("electron")
//const BrowserWindow = electron.remote.BrowserWindow;

const App: React.FC = (props) => {

  const routes = {
    '/': () => <Main handler={() => togglePlay}/>,
    '/vid': () => <Vid/>
  };

  const [play, setPlay] = useState(true);
 
  function togglePlay() {
    // (mainWindow as any).webContents.send('playit','GO GO GO');
    console.log("CLICKED");
  }

  const routeResult = useRoutes(routes)

  return (
      routeResult
  );

}

export default App;
