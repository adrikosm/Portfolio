import React from 'react';
import Typewriter from "typewriter-effect";
import "./about.css";


const About = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold underline text-sky-400">
            ABOUT
        </h1>
        <span className="text-3xl font-bold underline text-indigo-700" >
        <Typewriter
            options={{
                strings: ["Sofware Developer", "Machine Learning Enthusiast"],
                autoStart: true,
                loop: true,
                delay: 150,
                cursor: "_"
            }}
        />
            </span>
    </div>
  )
}

export default About;