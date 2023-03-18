import React from 'react';
import "./RentPage.css"
import { Collapse } from '@mui/material';
import ItemCard from "../components/ItemCard";
import "./RentPage.css"
import { AppBar } from '@mui/material';
import "../components/NavBar.css"
import {Link} from "react-router-dom";

function RentPage(props) {
    return (
        <div>
            <div className="background">
                <div className="categories">
                        <h2 className="rentText">Categories:</h2>
                        <h3 className="rentText">Sports</h3>
                        <h3 className="rentText">Tech</h3>
                        <h3 className="rentText">Clothing</h3>
                        <h3 className="rentText">Household</h3>
                        <h3 className="rentText">Vehicle</h3>
                        <h3 className="rentText">Kitchen</h3>
                        <h3 className="rentText">Plants</h3>
                        <div className="rentText" onClick={()=>console.log("")}>
                            <h3>Miscellaneous</h3>
                        </div>

                    <br/>


                </div>
            </div>

            <div className="itemsContainer">
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>

        </div>
    );
}

export default RentPage;
