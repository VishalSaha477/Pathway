function SideBar({ setScene }) {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh" }}
    >
      <h3 className="mb-4 text-white">Projects</h3>

      <div className="d-grid gap-2">
        <button
          className="btn btn-secondary btn-outline-white"
          onClick={() => setScene("panel")}
        >
          Panel
        </button>

        <button
          className="btn btn-secondary btn-outline-white"
          onClick={() => setScene("lifelog")}
        >
          Life Log
        </button>

        <button
          className="btn btn-secondary btn-outline-white"
          onClick={() => setScene("focusforge")}
        >
          FocusForge
        </button>

        <button
          className="btn btn-secondary btn-outline-white"
          onClick={() => setScene("lmsv1")}
        >
          LMS v1
        </button>

        <button
          className="btn btn-secondary btn-outline-white"
          onClick={() => setScene("lmsv2")}
        >
          LMS v2
        </button>

      </div>
    </div>
  );
}

export default SideBar;
