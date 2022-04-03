import React from 'react';
import './footer.css';

import github from "../../assets/github2.png"
import linkedin from "../../assets/linkedin2.png"
import email from "../../assets/email2.png"


const Footer = () => {
    return (
        <div className='Footer'>
            <div className="footer_rights">
                <p className="footer_name">
                    <span>Andreas</span> Mavropoulos</p>
            </div>
            <p className="fotter_copyRights">© All Rights Reserved </p>


            <div className="footer_socials">
                <a href="https://github.com/adrikosm" target="_blank"><img src={github} alt="Github" className="footer_social_icons" /></a>
                <a href="https://www.linkedin.com/in/andreas-mavropoulos/" target="_blank"><img src={linkedin} alt="LinkedIn" className="footer_social_icons" /></a>
                <a href="mailto:adrikosm@gmail.com"><img src={email} alt="Email" className="footer_social_icons" /></a>

            </div>
        </div>
    )
}

export default Footer;