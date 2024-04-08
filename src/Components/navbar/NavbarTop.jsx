import React from 'react'
import "./navbarTop.scss"
import { MdLocationOn, MdOutlinePersonOutline } from 'react-icons/md'
import { WiNightCloudy } from 'react-icons/wi'
import { BiCalendar } from 'react-icons/bi'
import { RxCaretDown } from 'react-icons/rx'
import { RiFacebookFill, RiTwitterFill } from 'react-icons/ri'
import { ImGooglePlus } from 'react-icons/im'
import { FaYoutube } from 'react-icons/fa'
import { useState } from "react"

const NavbarTop = () => {
    const [dropDown, setDropDown] = useState(false);

    const handleDropdown = (e) => {
        setDropDown(!dropDown);
    };

    return (
        <div className="navbarTop">
            <div className="navbarContainer">
                <div className="left">
                    <div className="item">
                        <MdLocationOn style={{ fontSize: "16px"}} />
                        <span> Dhaka </span>
                    </div>
                    <div className="item">
                        <WiNightCloudy/>
                        <span>21*C</span>
                    </div>
                    <div className="item">
                        <BiCalendar style={{fontsize: 
                        "16px"}}/>
                        <span>Today (Sunday 15 April 2024)</span>
                    </div>
                </div>
                <div className="right">
                            <div className="item">
                                <MdOutlinePersonOutline style={{fontsize:"18px"}}/>
                                <span>Login/Register</span>
                            </div>
                            <div className="item" onClick={handleDropdown}>
                                <MdOutlinePersonOutline style={{fontsize:"18px"}}/>
                                <span>English</span>
                                <RxCaretDown style={{fontsize:"18px"}}/>
                            </div>

                            <div className='icons'>
                                <RiFacebookFill style={{fontSize:"18px"}}/>
                                <RiTwitterFill style={{fontSize:"18px"}}/>
                                <ImGooglePlus style={{fontSize:"18px"}}/>
                                <FaYoutube style={{fontSize:"18px"}}/>
                            </div>

                            {dropDown && <ul className='dropDownMenu'>
                                <li>
                                    <a>English</a>
                                </li>
                                <li>
                                    <a>Spanish</a>
                                </li>
                                <li>
                                    <a>French</a>
                                </li>
                                </ul>}                            
                </div>                
            </div>
        </div>

    )
}

export default NavbarTop