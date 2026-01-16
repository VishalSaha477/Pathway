import { useEffect, useRef, useState } from "react";

function TimerPanel() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  console.log("TimerPanel rendered");

  function startTimer() {
    if (intervalRef.current !== null) return; // already running

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    console.log("Timer started");
  }

  function pause() {
    if (intervalRef.current === null) return; // already paused

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    console.log("Timer paused");
  }

  function resume() {
    startTimer();
  }
  function reset() {
    setSeconds(0);
  }

  // start timer on mount
  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("Timer cleaned up");
    };
  }, []);

  return (
    <div>
      <h2>Seconds: {seconds}</h2>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default TimerPanel;
