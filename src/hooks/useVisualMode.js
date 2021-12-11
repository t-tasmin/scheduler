import { useState } from "react";

export  function useVisualMode (modeInitial){

  [mode, setMode] = useState(modeInitial);
  const [history, setHistory] = useState([modeInitial]);

  function transition(modeNew) { 
    setMode(modeNew);
    history.push(modeNew);     
  }


  function back() { 
    history.pop();
    setMode(history[history.length-1]);
  }

  return { mode, transition, back };

  
}

function useCustomHook() {
  function action() {

  }

  return { action };
}