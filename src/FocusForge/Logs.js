function Logs({ logs }) {
  return (
    <div>
      <h1>Session Logs</h1>

      {logs.map((log, index) => (
        <div key={index}>
          <h3>{index+1}</h3><p>Time: {log.displayTime}</p>
          <p>Date: {log.date}</p>
          <p>Clock: {log.time}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}

export default Logs;
