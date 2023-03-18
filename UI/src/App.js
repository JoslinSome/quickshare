import logo from './logo.svg'
import React, {useEffect} from 'react';
import './App.css';
import RoutesNavigation from "./routes/Routes";


function App() {

  useEffect(() => {
    document.title = 'QuickShare';
  }, []);

  return <RoutesNavigation />;
}

export default App;
