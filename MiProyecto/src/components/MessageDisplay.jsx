function MessageDisplay({ phase, clicks }) {
  const messages = {
    1: "Te dije que no.",
    2: "¿Por qué sigues?",
    3: "Esto ya se mueve…",
    4: "Ups… se volteó.",
    5: "¿Dónde está?",
    6: "ERROR 0x44F",
    7: "Solo uno es real.",
    8: "Todo gira…",
    9: "CAOS TOTAL."
  };

  return (
    <h2 className="message">
      {messages[phase]} <br />
      Clicks: {clicks}
    </h2>
  );
}

export default MessageDisplay;