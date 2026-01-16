function Sidebar({ setScene }) {
    
console.log("Sidebar rendered");
  return (
    <div>
      <button onClick={() => setScene("settings")}>Settings</button>
      <button onClick={() => setScene("timerPanel")}>Timer</button>
    </div>
  );
}

export default Sidebar;
