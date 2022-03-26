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
                strings: ["Full Stack Web Developer", "Software Engineer"],
                autoStart: true,
                loop: true,
                delay: 100,
                cursor: "_"
            }}

        />
            </span>
    </div>
  )
}

export default About;