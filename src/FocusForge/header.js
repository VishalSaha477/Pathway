function Header({setScene}){
    return(
        <div>
            <button onClick={()=> setScene("homepage")}>Homepage</button>
            <button onClick={()=> setScene("session")}>Session</button>
            <button onClick={()=> setScene("logs")}>Logs</button>
        </div>
    )
}

export default Header;