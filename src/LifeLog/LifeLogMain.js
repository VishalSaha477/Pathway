import { useState, useEffect } from "react";
import MainScr from "./mainscr";
import LogList from "./LogList";

function LifeLogMain() {

    const [scene, setScene] = useState("mainscr");
    const [logs, setLogs] = useState([]);
    function handleLogSave(newLogs)
    {
        setLogs(prevLogs => [...prevLogs, newLogs])
    }


  useEffect(() => {
    const storedLogs = localStorage.getItem("lifelog");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lifelog", JSON.stringify(logs));
  }, [logs]);

    return (
        <div>
            <MainScr onSave={handleLogSave}/>
            <LogList logs={logs}/>
        </div>

        
    )
 
}
export default LifeLogMain;
