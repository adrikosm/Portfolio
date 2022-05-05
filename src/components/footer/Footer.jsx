import React from "react";
import "./footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";



const Footer = () => {
  return (
    <div className="Footer">
      <p className="footer_name">
        <span>Andreas</span> Mavropoulos
      </p>

      <div className="footer_rights">
        <p className="fotter_copyrights">© All Rights Reserved </p>
      </div>

      <div className="footer_socials">

        <a target= "_blank" href="https://github.com/adrikosm">
        <FontAwesomeIcon icon={faGithub} className="footer_social_icons hover:text-github" />
        </a>

        <a target = "_blank" href = "https://www.linkedin.com/in/andreas-mavropoulos/">
        <FontAwesomeIcon icon={faLinkedin} className = "footer_social_icons hover:text-linkedin" />
        </a>
        <a href="mailto:adrikosm@gmail.com">
        <FontAwesomeIcon icon={faEnvelope} className = "footer_social_icons hover:text-secondary"/>
        </a>
      </div>
    </div>
  );
};

export default Footer;
