function LogList({logs}){
    return(
        <div>
        <h1>List</h1>
        {logs.map ((log , index) => (<div key={index}>{log}</div>))}
        </div>
    )

    }
    export default LogList;