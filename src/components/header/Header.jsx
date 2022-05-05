import React, { useEffect, useState } from "react";
import "./header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import bars from "../../assets/bars.png";
import close from "../../assets/close.png";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className="Navbar">
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
            <img
              src={close}
              className="menu__icon"
              onClick={() => setToggleMenu(false)}
              alt=""
            />
          ) : (
            <img
              src={bars}
              className="menu__icon"
              onClick={() => setToggleMenu(true)}
              alt=""
            />
          )}
        </div>

        <div className="navbar__socials">
          <div className="socials__github">
            <a href="https://github.com/adrikosm" target="_blank">
              <FontAwesomeIcon
                icon={faGithub}
                className="navbar__github hover:text-github"
              />
            </a>
          </div>
          <div className="socials__linkedin">
            <a
              href="https://www.linkedin.com/in/andreas-mavropoulos/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="navbar__linkedin hover:text-linkedin"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
