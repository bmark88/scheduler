import { useState } from 'react';

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([]);

  function transition(newMode, replace) {
    if (!replace) {
      setHistory([...history, mode]);
    }
    setMode(newMode);
  }

  function back() {
    console.log({history})
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      setHistory([...history.slice(0, -1)]);
    }
  }

  return { transition, mode, back };
}

export default useVisualMode;