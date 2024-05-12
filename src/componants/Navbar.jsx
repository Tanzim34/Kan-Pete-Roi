import React from 'react';
import "./navbar.scss";
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className="navbarContainer">
                <div className="left">
                    <MdLocationOn></MdLocationOn>
                </div>
                <div className="Project_Title">
                    Kan Pete Roi
                </div>
                
            </div>

            
        </div>
    );
}

export default Navbar


