import "./MainSearchBar.css"
import React from 'react';
import {search} from 'react-icons-kit/ionicons/search'
function MainSearchBar(props) {
    return (
        <div >
            <h1>asdsa</h1>
            <div className="row">
                <input className="search" placeholder="Search for item"/>
                <div onClick={()=> console.log("")} className="searchBtn">
                    <search/>
                </div>
            </div>

        </div>
    );
}

export default MainSearchBar;
