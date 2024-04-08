import React from 'react'
import "./home.scss"
import NavbarTop from '../../Components/navbar/NavbarTop'
import AdvertTop from '../../Components/advertTop/AdvertTop'
import NavBarBottom from '../../Components/navBarBottom/NavbarBottom'
import Hotlinks from '../../Components/hotlinks/Hotlinks'
import MainContent from '../../Components/mainContent/MainContent'

const Home = () => {
    return (
        <div className="home">
            <div className= "homeWrapper">
                <NavbarTop/>
                <AdvertTop/>
                <NavBarBottom/>
                <Hotlinks/>
                <MainContent/>
            </div>    
        </div>

    )
}

export default Home