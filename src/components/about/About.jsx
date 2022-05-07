import React from "react";
import Typewriter from "typewriter-effect";
import "./about.css";
import logo from "../../assets/programming.png";
import resume from "../../assets/Resume.pdf";

const About = () => {
  return (
    <div className="about_section">
      <div className="left_section">
        <h1
          className="greeting_text text-3xl font-bold  text-primary
      xl:text-5xl
      lg:text-3 xl
      md:text-3xl
      sm:text-4xl"
        >
          <h3
            className="text-3xl
      xl:text-3xl
      lg:text-xl
      md:text-2xl
      sm:text-3xl
      "
          >
            Hi I am{" "}
          </h3>
          Andreas Mavropoulos
          <span className="text-secondary">
            <Typewriter
              options={{
                strings: ["Sofware Developer", "Data Scientist"],
                autoStart: true,
                loop: true,
                delay: 150,
                cursor: "|",
              }}
            />
          </span>
        </h1>
        <div class="box">
          <button
            className="resume_button  rounded-lg
            xl:text-4xl
            lg:text-3xl
            md:text-2xl
            sm:text-3xl
            "
          >
            <a href={resume} target="_blank">
              Resume
            </a>
          </button>
        </div>
      </div>

      <div className="rigt_section">
        <img src={logo} alt="logo" className="resize-image" />
      </div>
    </div>
  );
};

export default About;
