import { useEffect, useRef, useState } from "react";

function Session({onLog}) {

    const[totalSeconds, setTotalSeconds] = useState(0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const intS = useRef(null);

    function start(){
        if (intS.current !== null) return; 

         intS.current = setInterval(() => {
         setTotalSeconds(prev => prev + 1);
         
         
         }, 1000);
    }
    function pause(){
         if (intS.current === null) return;

         clearInterval(intS.current);
         intS.current = null;

    }
    function resume(){
        start();
    }
    
    function resetAndLog() {
    pause(); // stop timer safely

    const now = new Date();

    const sessionLog = {
      durationSeconds: totalSeconds,
      displayTime: `${hours}:${minutes}:${seconds}`,
      timestamp: now.getTime(),
      date: now.toDateString(),
      time: now.toLocaleTimeString()
    };

    onLog(sessionLog);   // ⬅️ SEND UPWARD
    setTotalSeconds(0);  // reset local state
  }

    useEffect(()=> {
        return ()=> {
            clearInterval(intS.current);
            intS.current = null;
        }
},[]);

    return (
        <div>
            <div>
                <h1>Elapsed Time ~ {hours}:{minutes}:{seconds} </h1>
                 <button onClick={start}>Start</button>
                 <p></p>
            </div>
            <div>
                 <button onClick={pause}>Pause</button>
                <button onClick={resume}>Resume</button>
            </div>
            <div>
                <p></p>
                 <button onClick={resetAndLog}>Reset And Log</button>
            </div>
        </div>

    )
}
export default Session;