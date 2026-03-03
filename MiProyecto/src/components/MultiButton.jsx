function MultiButton({ onCorrect }) {
  const correctIndex = Math.floor(Math.random() * 5);

  return (
    <div className="multi-container">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          className="chaos-btn"
          onClick={i === correctIndex ? onCorrect : undefined}
        >
          NO
        </button>
      ))}
    </div>
  );
}

export default MultiButton;