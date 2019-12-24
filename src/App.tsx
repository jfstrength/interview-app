import React, { useState, useEffect } from 'react';
import './App.css';
import Vid from './components/Vid';
import Main from './components/Main';
import {useRoutes} from 'hookrouter';

const App: React.FC = (props) => {

  const routes = {
    '/': () => <Main/>,
    '/vid': () => <Vid/>
  };

  const routeResult = useRoutes(routes)

  return (
      routeResult
  );

}

export default App;
