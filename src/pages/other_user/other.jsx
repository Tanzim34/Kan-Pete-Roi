import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import "./other.scss"

const Other = () => {
    const[userData,setuser]=useState("")
    const[alu,setalu]=useState(false)
    const { id } = useParams();
    const uid=localStorage.getItem('u_id')
    console.log(id)
    const ftc=async()=>{
        const response=await fetch(`http://127.0.0.1:8000/user_2/${id}/${uid}`,
        { // Replace {{userId}} with actual user ID
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, // Optional, depending on your FastAPI setup
            }
    )
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setuser(data)
      setalu(true)
    }
    useEffect(()=>{
     ftc()   
    },[id])
  return (
    <div className='other'>
        {
            !alu&&<div className='loading'>
                Loading.....
            </div>
        }
        {
            alu&& <div className='UserInfo'>
                      <div className='UserPic'>
                        <img src={'assets/logo.png'}/>
                        </div>
                        <div className='user_name'>
                            {userData.name}
                        </div>
                        <div className='Flower'>
                            {userData.follwer}
                        </div>

            </div>
        }
    </div>
  )
}

export default Other
