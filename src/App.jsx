import React from "react";
import About from './components/about/About';
import Personal from './components/personal/Personal'
import Contact from './components/contact/Contact';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Projects from "./components/projects/Projects";



const App = () => {
  return (
    <>
        <Header />
        <About />
        <Personal/>
        <Projects />
        <Contact />
        <Footer />
    </>
  )
};

export default App;