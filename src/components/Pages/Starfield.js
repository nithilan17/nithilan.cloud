import React, { useEffect, useState, useRef } from "react";
import "./Starfield.css";

// Number of static twinkling stars. Kept low for subtlety.
const STAR_COUNT = 70;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function Starfield() {
  const [stars] = useState(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      top: randomBetween(0, 100),
      left: randomBetween(0, 100),
      size: randomBetween(1, 2.2),
      duration: randomBetween(3, 7),
      delay: randomBetween(0, 5),
    }))
  );

  const [shootingStars, setShootingStars] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    let timeoutId;

    const spawnShootingStar = () => {
      const id = nextId.current++;
      const top = randomBetween(0, 40); // upper portion of the screen only
      const left = randomBetween(0, 70);
      const angle = randomBetween(20, 35);

      setShootingStars((prev) => [...prev, { id, top, left, angle }]);

      // Remove after animation finishes
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 1400);

      // Schedule next one — infrequent, so it stays subtle
      timeoutId = setTimeout(spawnShootingStar, randomBetween(6000, 14000));
    };

    timeoutId = setTimeout(spawnShootingStar, randomBetween(2000, 5000));

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
            "--angle": `${s.angle}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;