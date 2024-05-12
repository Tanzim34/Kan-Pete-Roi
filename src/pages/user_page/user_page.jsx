import React, { useEffect,useState } from 'react';

import "./user_page.scss"

import Sidebar from '../../componants/drawer/dwarer';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const UserPage = () => {

    let data2

    let token

    
        token = localStorage.getItem('token'); // Replace with your actual key
    
        if (token) {
          // Token found, use it
          //console.log('Extracted token:', token);
          // You can use the token for your API requests here
        } else {
          // Token not found, handle the case
          //console.log('No token found in local storage');
        }
    

    const [userData, setUserData] = useState(null);      
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [name,setname]=useState("")
    const[email,setEmail]=useState("")

    const [sidebar,setside]=useState(false)

    const oncolo=()=>{
        setside(false)
    }


  useEffect( () => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      //console.log(token)
      try {
        const response = await fetch(`http://127.0.0.1:8000/getuser/${token}`, { // Replace {{userId}} with actual user ID
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Optional, depending on your FastAPI setup
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const data = await response.json();
          //console.log('Success:', data);
          //setUserData(data)
          setname(data.name)
          setEmail(data.email)
          setIsLoading(true)

          console.log(name)
          console.log(email)
          console.log(isLoading)

        //console.log(email)
      } catch (error) {
        //setError(error);
      } finally {
        //setIsLoading(false);
      }
    };

    if (token) {
     fetchData();
    }
  },[]);



   

//    setname(userData.name)
//    setEmail(userData.email)
  console.log(name)
   //setUserData(data)

    return (
        <div className='userpage'>

            {
                <div className='user_information_container'>
                <div className='user_card'>
                <div className='user_profile'>
                    <img src={'assets/logo.png'} onError={(e) => e.target.src = 'assets/logo.png'} alt='User profile' />
                </div>
                {isLoading&&<div className='user_name'>
                    {name}
                </div>}
                {
                !isLoading&& <div className='loding'>
                    Loading...
                </div>
            }
                {isLoading&&<div className='user_email'>
                    {email}

                </div>}
                {
                !isLoading&& <div className='loding'>
                    Loading...
                </div>
            }
                </div>
                <div className='user_post'>
                user_post_list
                </div>
            </div>
            }
            <div className='user_follow_list'>
                follow_list
            </div>
            <div className='most_recent_relavent_post'>
                small post card list
            </div>
            <div className='sidebarbutton'>
                <button onClick={()=>{
                    setside(true)
                }}>
                    open
                </button>
            </div>
            <div className='side'>
                <Sidebar isOpen={sidebar} onClose={oncolo}></Sidebar>
            </div>
        </div>
    );
}

export default UserPage;
