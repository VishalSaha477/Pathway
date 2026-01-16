import { useEffect, useState } from "react";

function Home() {
  console.log("Home rendered");

  const [i,setI] = useState(1);
  function inc() {
    setI(i+1);
  }
 useEffect(()=>{
    console.log("Incremented to : ", i);
 },[i] );


  return(
    <div>
         <h2>Home Screen</h2>
         <button onClick={inc}>+</button>
    </div>
   
  ) ;
}

export default Home;
