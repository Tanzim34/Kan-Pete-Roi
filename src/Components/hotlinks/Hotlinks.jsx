import React from 'react';
import "./hotlinks.scss"
import { MdFavorite, MdFavoriteBorder, MdFlashOn, MdStarBorder, MdVisibility, MdWhatshot } from 'react-icons/md';

const Hotlinks = () => {
    return <div className='hotlinks'>
        <div className="hotlinksWrapper">
            <div className="item">
                <a>
                    <MdStarBorder style = {{fontSize:"30px"}}/>
                    <span> Featured News</span>
                </a>
            </div>
            <div className="item">
                <a>
                    <MdFavoriteBorder style = {{fontSize:"30px"}}/>
                    <span> Most Popular</span>
                </a>
            </div>
            <div className="item">
                <a>
                    <MdWhatshot style = {{fontSize:"30px"}}/>
                    <span> Hot News</span>
                </a>
            </div>
            <div className="item">
                <a>
                    <MdFlashOn style = {{fontSize:"30px"}}/>
                    <span> Trending News</span>
                </a>
            </div>
            <div className="item">
                <a>
                    <MdVisibility style = {{fontSize:"30px"}}/>
                    <span> Most Watched</span>
                </a>
            </div>
        </div>
 
        <div className="news--ticker">
            <div className='container'>
                <div className='title'>
                    <h2>News Updates </h2>
                    <span>  ( Update 20 minutes ago )</span>
                </div>
            </div>
        </div>
    </div>
};

export default Hotlinks;