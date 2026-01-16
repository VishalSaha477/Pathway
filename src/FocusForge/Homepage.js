function Homepage({change}) {
    return (
        <div>
            <h1>FocusForge</h1>
            <h3>Description :</h3>
            <p>An app to measure your Focus Sessions</p>
            <p>And keep Track of Earlier Sessions</p>
            <h3>Press the button to start your Session :</h3>
            <button onClick={change}> GO </button>
        </div>
    )
}

export default Homepage;