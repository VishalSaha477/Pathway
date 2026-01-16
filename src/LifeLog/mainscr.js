import { useState } from "react";

function MainScr({onSave}){

    const [newlog, setNewLog] = useState("");
function handleSave() {
    onSave(newlog)
}
 return(
    <div>
        <h1> LifeLog </h1>
        <p> Enter your Log Below</p>
        <input placeholder = "NEW LOG..." value={newlog} onChange={(e) => setNewLog(e.target.value)}/>
        <button onClick={handleSave}>Save Log</button>

    </div>
 )
}
export default MainScr;
