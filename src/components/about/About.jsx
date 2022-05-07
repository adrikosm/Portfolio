import React from "react";
import Typewriter from "typewriter-effect";
import "./about.css";
import logo from "../../assets/programming.png";


const About = () => {
  return (
    <div className="about_section">

      <div className="left_section">
       
      <h1 className="greeting_text text-4xl font-bold  text-primary">
      <h3 className="text-3xl lg: text-xl">Hi I am </h3>
        Andreas Mavropoulos
        <span className="text-secondary">
        <Typewriter
          options={{
            strings: ["Sofware Developer", "Machine Learning Enthusiast"],
            autoStart: true,
            loop: true,
            delay: 150,
            cursor: "|",
          
          }}
        />
        </span>
      </h1>
      <button className="resume_button text-3xl lg: text-xl ">Resume</button>
      </div>
   
      <div className="rigt_section">
        <img src = {logo} alt="logo" className="resize-image"/>
      </div>


    </div>
  );
};

export default About;
