import React, { useState } from 'react';
import './dwarer.scss'; // Import CSS file for styling

const Sidebar = ({ isOpen, onClose }) => {

    //const[kholo,setkholo]=useState(isOpen)
  return (

    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;

