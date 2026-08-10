import React from "react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Home.css';
import githubLogo from '../Images/github.png';
import linkedinLogo from '../Images/linkedin.png';
import calendarLogo from '../Images/calendar.png';
import resumeLogo from '../Images/resume.png';


function Home() {
  const [title] = useTypewriter({
    words: ["Hi, I'm Nithilan!"],
    loop: 1,
  });

  return (
    <div className="App">
      <header className="App-header" id="home">
        <h1>
          <span>{title}</span>
          <Cursor />
        </h1>

      <section className="about-me">
        <p>
          I'm a software engineer from Chicago, IL🏙️
          
          <br></br> <br></br>
          I studied Computer Science and Economics at <a href="https://siebelschool.illinois.edu/" target="_blank" rel="noopener noreferrer">UIUC</a> ('26). I am interested in <b>scalable systems</b> and <b>automation</b>.
          Feel free to reach out or connect!
        </p>
      </section>
      
      <div className="button-container">
        <a href="https://github.com/nithilan17" target="_blank" rel="noopener noreferrer">
          <button className="social-button">
            <img src={githubLogo} alt="GitHub" className="social-logo" />
          </button>
        </a>
        <a href="https://www.linkedin.com/in/nithilanelangovan/" target="_blank" rel="noopener noreferrer">
          <button className="social-button">
            <img src={linkedinLogo} alt="LinkedIn" className="social-logo" />
          </button>
        </a>
        <a href="https://drive.google.com/file/d/1mkr-lGyJgXfcIbBaKxhRePuLOJEy_YYn/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          <button className="social-button">
            <img src={resumeLogo} alt="Resume" className="social-logo" />
          </button>
        </a>
        {/* <a href="https://calendly.com/nithilan17" target="_blank" rel="noopener noreferrer">
          <button className="social-button">
            <img src={calendarLogo} alt="Calendar" className="social-logo" />
          </button>
        </a> */}

      </div>

      {/* Footer Always at Bottom */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Nithilan Elangovan</p>
      </footer>

      </header>
    </div>
  );
}

export default Home;
