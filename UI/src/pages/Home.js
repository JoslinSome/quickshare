import React from 'react';
import techCover from "../assets/images/techCover.jpeg"
import "./Home.css"
import MainSearchBar from "../components/MainSearchBar";
function Home(props) {
    return (
        <div className="cover">
            <div >
                <img src={techCover} className="img"/>
            </div>
        </div>
    );
}

export default Home;
