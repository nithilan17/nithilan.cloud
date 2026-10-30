import React, { useEffect, useState, useRef } from 'react';
import './Starfield.css';

const STAR_COUNT = 70;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function Starfield() {
  const [stars] = useState(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => {
      const duration = randomBetween(3, 7);
      return {
        id: i,
        top: randomBetween(0, 100),
        left: randomBetween(0, 100),
        size: randomBetween(1, 2.2),
        duration,
        delay: -randomBetween(0, duration),
      };
    }),
  );

  const [shootingStars, setShootingStars] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    let timeoutId;

    const spawnShootingStar = (top, left, angle) => {
      const id = nextId.current++;
      setShootingStars((prev) => [...prev, { id, top, left, angle }]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 1400);
    };

    const spawnAmbientStar = () => {
      spawnShootingStar(
        randomBetween(0, 40),
        randomBetween(0, 70),
        randomBetween(20, 35),
      );
      timeoutId = setTimeout(spawnAmbientStar, randomBetween(6000, 14000));
    };

    timeoutId = setTimeout(spawnAmbientStar, randomBetween(2000, 5000));

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            '--angle': `${s.angle}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;
