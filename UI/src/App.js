import logo from './logo.svg'
import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/NavBar";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import SellPage from "./pages/SellPage"


function App() {

  useEffect(() => {
    document.title = 'QuickShare';
  }, []);

  return <RoutesNavigation />;
}

export default App;
