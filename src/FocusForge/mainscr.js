
import Homepage from "./Homepage";
import Session from "./Session";
import Logs from "./Logs";
import { useState } from "react";

function MainScr({scene, setScene}) {

    const [logs,setLogs] = useState([]);
    function updateLog(sessionLog)
    {
        setLogs(prev => [...prev, sessionLog])
    }

        if (scene === "homepage") return <Homepage change={() => setScene("session")}/>;
        if (scene === "session") return <Session onLog={updateLog}/>;
        if (scene === "logs") return <Logs logs ={logs}/>;
        return <h1>PageMissing</h1>

}

export default MainScr