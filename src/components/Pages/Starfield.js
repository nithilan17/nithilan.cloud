import React, { useEffect, useState, useRef } from "react";
import "./Starfield.css";

const STAR_COUNT = 70;
const MAX_CLICK_STARS = 8; // caps rapid-click spam

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
    })
    );

  const [shootingStars, setShootingStars] = useState([]);
  const nextId = useRef(0);
  const clickStarCount = useRef(0);

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
      spawnShootingStar(randomBetween(0, 40), randomBetween(0, 70), randomBetween(20, 35));
      timeoutId = setTimeout(spawnAmbientStar, randomBetween(6000, 14000));
    };

    timeoutId = setTimeout(spawnAmbientStar, randomBetween(2000, 5000));

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      // Soft rate-limit so someone spam-clicking doesn't flood the screen
      if (clickStarCount.current >= MAX_CLICK_STARS) return;
      clickStarCount.current += 1;
      setTimeout(() => { clickStarCount.current -= 1; }, 1400);

      const id = nextId.current++;
      const top = (e.clientY / window.innerHeight) * 100;
      const left = (e.clientX / window.innerWidth) * 100;
      const angle = randomBetween(15, 45);

      setShootingStars((prev) => [...prev, { id, top, left, angle }]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, 1400);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
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