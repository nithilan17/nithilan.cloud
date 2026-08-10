import React, { useState, useEffect } from "react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Home.css';
import Starfield from './Starfield';
import githubLogo from '../Images/github.png';
import linkedinLogo from '../Images/linkedin.png';
import spotifyLogo from '../Images/spotify.png';
// import calendarLogo from '../Images/calendar.png';
import resumeLogo from '../Images/resume.png';

function SpotifyNowPlaying() {
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'error'

  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => res.json())
      .then((data) => {
        if (data.track) {
          setTrack(data.track);
          setStatus('ok');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') return null;
  if (status === 'error' || !track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotify-widget"
    >
      {track.albumArt && (
        <img src={track.albumArt} alt={track.name} className="spotify-art" />
      )}

      <div className="spotify-text">
        <span className="spotify-label">
          Last played on
          <img src={spotifyLogo} alt="Spotify" className="spotify-logo" />
        </span>
        <span className="spotify-track">{track.name}</span>
        <span className="spotify-artist">{track.artist}</span>
      </div>
    </a>
  );
}

function Home() {
  const [title] = useTypewriter({
    words: ["Hi, I'm Nithilan!"],
    loop: 1,
  });

  return (
    <div className="App">
      <Starfield />
      <header className="App-header" id="home">
        <h1>
          <span>{title}</span>
          <Cursor />
        </h1>

      <section className="about-me">
        <p>
          I'm a software engineer from Chicago, IL📍
          
          <br></br> <br></br>
          I studied Computer Science and Economics at <a href="https://siebelschool.illinois.edu/" target="_blank" rel="noopener noreferrer">UIUC</a> ('26). I am interested in <b>agentic AI</b>, <b>scalable systems</b>, and <b>automation</b>.
          Feel free to reach out or connect!
        </p>
      </section>

      <SpotifyNowPlaying />

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