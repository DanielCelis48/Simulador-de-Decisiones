import { useState, useEffect, useRef } from "react";
import ChaosButton from "./components/ChaosButton";
import MultiButton from "./components/MultiButton";
import GhostMode from "./components/GhostMode";
import MessageDisplay from "./components/MessageDisplay";

function App() {
  const [clicks, setClicks] = useState(0);
  const [phase, setPhase] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ top: 50, left: 50 });

  const [ghostActive, setGhostActive] = useState(false);
  const [ghostCompleted, setGhostCompleted] = useState(false);
  const [multiMode, setMultiMode] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const rotationInterval = useRef(null);

  // 🔊 SONIDOS
  const clickSound = useRef(new Audio("/sounds/click.mp3"));
  const glitch1 = useRef(new Audio("/sounds/glitch1.mp3"));
  const glitch2 = useRef(new Audio("/sounds/glitch2.mp3"));
  const alarm = useRef(new Audio("/sounds/alarm.mp3"));

  /* CONTROL DE FASES (MULTI MÁS CORTA) */
  useEffect(() => {
    if (clicks <= 5) setPhase(1);
    else if (clicks <= 15) setPhase(2);
    else if (clicks <= 25) setPhase(3);
    else if (clicks <= 35) setPhase(4);
    else if (clicks <= 45) setPhase(5);
    else if (clicks <= 60) setPhase(6);
    else if (clicks <= 65) setPhase(7);
    else if (clicks <= 95) setPhase(8);
    else setPhase(9);
  }, [clicks]);

  /* EFECTOS POR FASE */
  useEffect(() => {
    setGlitch(phase === 6);
    setMultiMode(phase === 7);

    // 🌀 ROTACIÓN DINÁMICA EN FASE 4
    if (phase === 4) {
      rotationInterval.current = setInterval(() => {
        const angles = [0, 180, 90, -90];
        const randomAngle =
          angles[Math.floor(Math.random() * angles.length)];
        setRotation(randomAngle);
      }, 1500);
    } else {
      clearInterval(rotationInterval.current);
      setRotation(0);
    }

    // 👻 Ghost
    if (phase === 5 && !ghostCompleted) {
      setGhostActive(true);
    } else {
      setGhostActive(false);
    }

    if (phase !== 5) {
      setGhostCompleted(false);
    }

    // 🔊 GLITCH SONORO
    if (phase === 6) {
      glitch1.current.loop = true;
      glitch2.current.loop = true;
      alarm.current.loop = true;

      glitch1.current.play();
      glitch2.current.play();
      alarm.current.play();
    } else {
      glitch1.current.pause();
      glitch2.current.pause();
      alarm.current.pause();

      glitch1.current.currentTime = 0;
      glitch2.current.currentTime = 0;
      alarm.current.currentTime = 0;
    }

    return () => clearInterval(rotationInterval.current);
  }, [phase, ghostCompleted]);

  /* CLICK PRINCIPAL */
  const handleClick = () => {
    setClicks(prev => prev + 1);

    clickSound.current.currentTime = 0;
    clickSound.current.play();

    if (phase >= 3) {
      // 🔥 En fase 8 reducimos rango para que no se salga al rotar
      const min = phase >= 8 ? 25 : 15;
      const max = phase >= 8 ? 50 : 70;

      setPosition({
        top: Math.random() * max + min,
        left: Math.random() * max + min
      });
    }

    // 🔥 Limitamos rotación infinita
    if (phase >= 8) {
      setRotation(prev => (prev + 20) % 360);
    }
  };

  return (
    <div className={`app ${glitch ? "glitch" : ""}`}>
      <div
        className="rotating-layer"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <MessageDisplay phase={phase} clicks={clicks} />

        {ghostActive ? (
          <GhostMode
            onSuccess={() => {
              setGhostCompleted(true);
              handleClick();
            }}
          />
        ) : multiMode ? (
          <MultiButton onCorrect={handleClick} />
        ) : (
          <ChaosButton
            onClick={handleClick}
            position={position}
          />
        )}
      </div>
    </div>
  );
}

export default App;