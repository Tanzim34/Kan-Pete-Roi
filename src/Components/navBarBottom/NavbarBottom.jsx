import React from 'react'
import "./navbarBottom.scss"
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

const NavBarBottom = () => {
    return <div className='navbarBottom'>
        <div className='navbarBottomWrapper'>
            <div className='item'>
                <span>Worlds News</span> 
                <MdKeyboardArrowDown style={{fontsize: "20px"}}/>   
            </div> 
            <div className='item'>
                <span>Naional</span>    
            </div> 
            <div className='item'>
                <span>Financial </span>    
            </div>
            <div className='item'>
                <span>Lifestyle </span>    
            </div>  
            <div className='item'>
                <span>Entertainment </span>    
            </div> 
            <div className='item'>
                <span>Technology </span>    
            </div> 
            <div className='item'>
                <span>Travel</span>
                <MdKeyboardArrowDown style={{fontsize:"20px"}}/>    
            </div> 
            <div className='item'>
                <span>Sports</span>    
            </div> 
            <div className='item'>
                <span>Pages</span>
                <MdKeyboardArrowDown style={{fontsize:"15px"}}/>    
            </div>
            <div className='item'>
                <FaSearch />    
            </div>     
        </div>    
    </div>
};

export default NavBarBottom;