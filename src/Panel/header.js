function Header({ setScene }) {
    
console.log("Header rendered");
  return (
    <div>
      <button onClick={() => setScene("home")}>Home</button>
      <button onClick={() => setScene("profile")}>Profile</button>
    </div>
  );
}

export default Header;
