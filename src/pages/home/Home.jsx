import React from 'react';
import Navbar from '../../componants/Navbar';
import "./home.scss";
import Adbar from '../../componants/Adbar/Adbar';
import Navbarbu from '../../componants/navbarBU/Navbarbu';
import PostView from '../post_view/postview';
import Drawer from '../../componants/drw/drw';

const Home = () => {

  let alu="all"

  alu=localStorage.getItem('genre')
  
  console.log(alu)

  return (
    <div className='home'>
      <Drawer></Drawer>
      <Navbar/>
      {/* <Adbar/> */}
      <Navbarbu/>
      <PostView gener={"all"}></PostView>
    </div>
  )
}

export default Home
