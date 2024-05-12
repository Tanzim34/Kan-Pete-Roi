import React, { useEffect, useState } from 'react';
import './drw.scss'; // import your CSS file for styling
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Drawer = () => {

    const[log,setlog]=useState('Log Out');
    const[name,setname]=useState(localStorage.getItem('name'))
    const[email,setemail]=useState(localStorage.getItem('email'))

    useEffect(()=>{
        if(localStorage.getItem('log')==='out'){
            setname('NO NAME')
            setemail('NO Email')
            setlog('Log In');
        }
    },[])

  const handleProfileClick = () => {
    if(localStorage.getItem('log')==='in'){
        window.location.href = '/Cu_user';
    }
    else{
        alert('log in first')
        window.location.href = '/login';
    }
  };

  const handleForYouClick = () => {
    alert('For You');
  };
  const tk=localStorage.getItem('token')
  const alu=async()=>{
    const response= await fetch(`http://127.0.0.1:8000/logout/${tk}`,{
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if(!response.ok){
        throw new Error(`Error: ${response.status}`);
    }
    const redata=await response.json();
    if(redata==='ok'){
        localStorage.setItem('token','0000')
        localStorage.setItem('name','0000')
        localStorage.setItem('email','0000')
        alert('Logout');
        localStorage.setItem('log','out');
        window.location.href = '/';
    }
    else{
        alert('Something Wrong');
    }
  }
  const handleLogout = async () => {
    if(localStorage.getItem('log')==='in'){
        alu();
    }
    else{
        alert('log in fisrt')
        window.location.href = '/login';
    }
    
  };

  const creta=()=>{
    if(localStorage.getItem('log')==='in'){
        window.location.href = '/create_post';
    }
    else{
        alert('Log In First')
    }
  }


  return (
    <div>
      <div className="drawer open">
        <div className="drawer-header">
          <h2>User Info</h2>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
        <div className="drawer-body">
          <button className="drawer-button" onClick={handleProfileClick}>Profile</button>
          <button className="createpost" onClick={creta}>Create Post</button>
          <button className="drawer-button" onClick={handleForYouClick}>For You</button>
          <button className="drawer-button" onClick={handleLogout}>{log}</button>
          
        </div>
      </div>
    </div>
  );
};

export default Drawer;
