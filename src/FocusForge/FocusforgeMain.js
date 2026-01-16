import { useState } from "react";
import Header from "./header"
import MainScr from "./mainscr"

function FocusForgeMain() {

    const [scene,setScene]= useState("homepage");

    return (
       <div>
        <Header setScene= {setScene} />
        <MainScr scene= {scene} setScene={setScene}/>
       </div>
    )
}

export default FocusForgeMain