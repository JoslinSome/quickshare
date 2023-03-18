import React from 'react';
import techCover from '../assets/images/techCover.jpeg';
import './WelcomePage.css';
import MainSearchBar from '../components/MainSearchBar';
function WelcomePage(props) {
  return (
    <div className="cover">
      <div>
        <img src={techCover} className="img" />
      </div>
    </div>
  );
}

export default WelcomePage;
