import { useState } from "react";

export default function useVisualMode (modeInitial) {

  const [mode, setMode] = useState(modeInitial);
  const [history, setHistory] = useState([modeInitial]);

  
  function transition(modeNew, replace = false) {
       
    if (!replace) {
      setMode(modeNew);
      setHistory([...history, modeNew]); 
    }
    else {
      setMode(modeNew);
    }
  }


  function back() { 
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }

  return { mode, transition, back };

  
};
