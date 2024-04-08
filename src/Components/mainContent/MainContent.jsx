import React from 'react';
import "./mainContent.scss"
import { MdFlashOn } from 'react-icons/md';

const MainContent = () => {
    return <div className='mainContent'>
        <div className="col">
            <div className="row">
                <img src="assets/usUkraine.jpg" alt="" />
                <a className='cat'>Politics</a>
                <a className='icon'>
                    <MdFlashOn style = {{fontSize: "20px"}}/>
                </a>

                <div className="postInfo">
                    <ul className='nav'>
                        <li>Molly Nagle</li>
                        <li>10 January 2023 </li>
                    </ul>
                    <h3>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, aliquam maxime.
                    </h3>
                </div>
            </div>        
        </div>
        <div className='col'>
            <div className='row'>
                <div className='col'>
                    <div className='row'>
                        <img src="assets/banner-02.jpg" alt="" />
                        <a className='cat'>Travel</a>
                        <a className='icon'>
                            <MdFlashOn style={{fontSize: "20px"}}/>
                        </a>
                        <div className="postInfo">
                            <ul className='nav'>
                            < li>Molly Nagle</li>
                            < li>10 January 2023 </li>
                            </ul>
                            <h3>
                            Lorem ipsum dolor sit.
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <img src="assets/banner-03.jpg" alt="" />
                        <a className='cat'>Education</a>
                        <a className='icon'>
                            <MdFlashOn style={{fontSize: "20px"}}/>
                        </a>
                        <div className="postInfo">
                            <ul className='nav'>
                            < li>Molly Nagle</li>
                            < li>10 January 2023 </li>
                            </ul>
                            <h3>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, aliquam maxime.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <img src="assets/banner-04.jpg" alt="" />
                <a className='cat'>Education</a>
                        <a className='icon'>
                            <MdFlashOn style={{fontSize: "20px"}}/>
                        </a>
                        <div className="postInfo">
                            <ul className='nav'>
                            < li>Molly Nagle</li>
                            < li>10 January 2023 </li>
                            </ul>
                            <h3>
                            Lorem ipsum dolor sit.
                            </h3>
                        </div>        
            </div>
        </div>
    </div>
};

export default MainContent;