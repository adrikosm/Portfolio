import React, { useEffect, useState } from "react";
import './header.css';

import github from "../../assets/github2.png"
import email from "../../assets/email2.png"
import linkedin from "../../assets/linkedin2.png"
import bars from "../../assets/bars.png"
import close from "../../assets/close.png"


const Header = () => {
    const [toggleMenu,setToggleMenu] = useState(false)
    const [screenWidth,setScreenWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const changeWidth = () =>{
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize",changeWidth);
        return() => {
            window.removeEventListener("resize",changeWidth)
        };
    },[]);

    return (
        <div className="Navbar text-lime-600">
            <nav>
                {(toggleMenu || screenWidth > 1024) && (
                    <ul className="list">

                        <li className="links">
                            <a href="#">About</a>
                        </li>

                        <li className="links">
                            <a href="#">Projects</a>
                        </li>

                        <li className="links">
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                )}
                <div className="menu-icons">
                {toggleMenu ? (
                    <img src={close} 
                    className = "menu__icon"
                    onClick = {() => setToggleMenu(false)}
                    alt=""/>
                ):(
                    <img src={bars} 
                    className = "menu__icon"
                    onClick = {() => setToggleMenu(true)}
                    alt=""/>
                )}
                </div>

                <div className="navbar__socials">

                    <div className="socials__linkedin">
                        <img src = {linkedin} 
                        classname ="navbar__linkedin"
                        alt="linkedin"/>
                        <p>LinkedIn</p>
                    </div>

                    <div className="socials__github">
                        <img src = {github} 
                        classname ="navbar__github"
                        alt="github"/>
                        <p>Github</p>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Header;
