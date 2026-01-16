import { useNavigate } from "react-router-dom";

function LMSLayout({ children }) {
    const nav = useNavigate();
  return (
    <div className="container-fluid vh-100 d-flex flex-column bg-light">
      
      {/* LMS Header */}
      <div className="card rounded-0 shadow-sm">
        <div className="card-body bg-danger text-white text-center fs-4">
          <a href="#" className="text-white" onClick={() => nav("/")} >LMSv2</a>
          <span className="small fw-light fs-6"> $ click for login page</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-fill p-4 overflow-auto">
        {children}
      </div>

    </div>
  );
}

export default LMSLayout;
