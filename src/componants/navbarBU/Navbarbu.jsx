import React, { useState } from 'react';

import "./navbarbu.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbarbu = () => {
    const [homecontainer, setHomeContainer] = useState(
        ['all', 'National', 'Sports']
    );
    const[worldnews,setworldnews]=useState(
        ['bangladesh','india','pakistan']
    )
    let gee=localStorage.getItem('genre')
    if (!gee){
        gee="all"
    }
    const[wn,setwn]=useState(worldnews[0])
    const[wndrop,setwndrop]=useState(false)
    const [HomeCview,sethomeCview]=useState(gee)
    const[homedrop,sethomedrop]=useState(false)
    const[src,setsrc]=useState(false)
    const[srcinput,setsrcinput]=useState("")
  return (
    <div className='navberbu'>
      <div className='navbarcontainer'>

        <div className='homecontainer'>
           {HomeCview}
           <button onClick={()=>{
            setwndrop(false)
            sethomedrop(!homedrop)
            setsrc(false)
           }}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            
            
           
        </div>

        <div className='worldnews'>
           {wn}
           <button onClick={()=>{
            setwndrop(!wndrop)
            sethomedrop(false)
            setsrc(false)
           }}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
        </div>

        <div className='national'>
            <button onClick={()=>{
                localStorage.setItem('genre','National')
                window.location.reload();
            }}>
            National
            </button>
        </div>
        <div className='international'>
            <button onClick={()=>{
                localStorage.setItem('genre','International')
                window.location.reload();
            }}>
            International
            </button>
        </div>
        <div className='binodhon'>
            <button onClick={()=>{
                localStorage.setItem('genre','Binodhon')
                window.location.reload();
            }}>
            Binodhon
            </button>
        </div>
        <div className='lifestyle'>
           <button onClick={()=>{
                localStorage.setItem('genre','Lifestyle')
                window.location.reload();
            }}>
           Lifestyle
           </button>
        </div>
        <div className='sports'>
           <button onClick={()=>{
                localStorage.setItem('genre','Sports')
                window.location.reload();
            }}>
           Sports
           </button>
        </div>
        <div className='searchicon'>
           <button onClick={(()=>{
            setwndrop(false)
            sethomedrop(false)
            setsrc(!src)
           })}>
           <FontAwesomeIcon icon={faSearch} />
           </button>
        </div>
        
      </div>
      {
        homedrop&&<ul className='homedropdown'>
        <li>
            <a>
                <button onClick={()=>{
                    localStorage.setItem('genre',homecontainer[0])
                    
                    sethomeCview(homecontainer[0])
                    window.location.reload();
                    
                }}>
                {homecontainer[0]}
                </button>
            </a>
        </li>
        <li>
            <a>
            <button onClick={()=>{
                    localStorage.setItem('genre',homecontainer[1])
                    
                    sethomeCview(homecontainer[1])
                    window.location.reload();
                }}>
                {homecontainer[1]}
                </button>
            </a>
        </li>
        <li>
            <a>
            <button onClick={()=>{
                    localStorage.setItem('genre',homecontainer[2])
                    
                    sethomeCview(homecontainer[2])
                    window.location.reload();
                }}>
                {homecontainer[2]}
                </button>
            </a>
        </li>
      </ul>
      }
      {
        wndrop&&<ul className='worlddropdown'>
        <li>
            <a>
            <button onClick={()=>{
                    setwn(worldnews[0])
                }}>
                {worldnews[0]}
                </button>
            </a>
        </li>
        <li>
            <a>
            <button onClick={()=>{
                    setwn(worldnews[1])
                }}>
                {worldnews[1]}
                </button>
            </a>
        </li>
        <li>
            <a>
            <button onClick={()=>{
                    setwn(worldnews[2])
                }}>
                {worldnews[2]}
                </button>
            </a>
        </li>
      </ul>
      }
      {
        src&& <div className='searchinput'>
        <input
            type="text"
            value={srcinput}
            onChange={(e)=>{
                setsrcinput(e.target.value)
            }}
            placeholder="SEARCH"
        />
        
        </div>
      }
    </div>
  )
}

export default Navbarbu
