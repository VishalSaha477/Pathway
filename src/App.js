import SideBar from "./SideBar";
import MainScreen from "./MainScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";


import './App.css';
import { useState } from 'react';

function App() {
  const [scene,setScene] = useState("panel");
  return (
    <BrowserRouter>
    <div>
      <div className="d-flex" style={{ height: "100vh" }}>
        <SideBar setScene={setScene}/>
        <MainScreen scene={scene}/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
