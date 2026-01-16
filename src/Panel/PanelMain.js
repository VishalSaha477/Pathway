import Sidebar from "./sidebar";
import MainScr from "./mainscr";
import Header from "./header";

import { useState } from 'react';

function PanelMain() {
  const [scene,setScene] = useState("home");
  return (
    <div>
      <Header setScene={setScene}/>

      <div style={{ display: "flex" }}>
        <Sidebar setScene={setScene}/>
        <MainScr scene={scene}/>
      </div>
    </div>
  );
}

export default PanelMain;
