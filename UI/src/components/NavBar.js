import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa';
import {Icon} from '@iconify/react';
import {ShoppingCartOutlined} from '@ant-design/icons';

import './NavBar.css';
import Logo from '../assets/images/Logo.png';
import MainSearchBar from './MainSearchBar';
function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  function handleClick() {
    setClick(!click);
  }
  function closeMenu() {
    setClick(false);
  }
  function displayButton() {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
    window.addEventListener('resize', displayButton);
  }
  return (
    <div className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <img src={Logo} className="logo" />
        </Link>
        <MainSearchBar />
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li>
            <Link to="/sign-in" className="nav-links">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-links">
              Rent
            </Link>
          </li>
          <li>
            <Link to="/sell" className="nav-links">
              Sell
            </Link>
          </li>
          <li>
            <Link to="/graph" className="nav-links">
              <ShoppingCartOutlined size={60} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
