import logo from './logo.svg'
import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/NavBar";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";


function App() {

  useEffect(() => {
    document.title = "QuickShare"
  }, [])

  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>

  );
}

export default App;
