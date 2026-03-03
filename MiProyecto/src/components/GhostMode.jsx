import { useEffect, useState } from "react";

function GhostMode({ onSuccess }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const size = 250;
    const top = Math.random() * (window.innerHeight - size);
    const left = Math.random() * (window.innerWidth - size);
    setPos({ top, left });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0
      }}
    >
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Encuentra el botón invisible…
      </p>

      <div
        onClick={onSuccess}
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          top: pos.top,
          left: pos.left,
          backgroundColor: "transparent"
        }}
      />
    </div>
  );
}

export default GhostMode;