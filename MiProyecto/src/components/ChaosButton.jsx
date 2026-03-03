function ChaosButton({ onClick, position }) {
  return (
    <button
      className="chaos-btn"
      onClick={onClick}
      style={{
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: "translate(-50%, -50%)"
      }}
    >
      NO LO PRESIONES
    </button>
  );
}

export default ChaosButton;