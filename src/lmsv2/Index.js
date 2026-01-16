import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    fetch("https://pathway-m76o.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then(res => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then(user => {
      // store user session
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") nav("/admin");
      else if (user.role === "student") nav("/student");
      })
      .catch(() => {
        setError("Invalid email or inactive account");
      });
  }

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "350px" }}>
        <div className="card p-4 shadow-sm rounded-4 border-1">

          <div className="card-header bg-primary rounded-2 border-3">
            <h1 className="text-center text-uppercase text-white fw-semibold m-2 fs-4">
              Sign In
            </h1>
          </div>

          <div className="card-body p-2 mt-4">
            <form onSubmit={handleLogin}>

              <div className="m-1">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control border-secondary"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="text-danger small mt-2 text-center">
                  {error}
                </div>
              )}

              <div className="mt-4 d-flex justify-content-center">
                <button
                  type="submit"
                  className="w-75 btn btn-success border-3 rounded-3"
                >
                  Login
                </button>
              </div>

            </form>
          </div>

          <div className="card-footer text-center mt-4">
            <p className="small text-muted">
              Demo LMS — login
            </p>
            <p className="small fw-light text-end">""  admin@admin.com  "" to access Admin</p>
            <p className="small fw-light text-end">""  blossom@gmail.com  "" to access Blossom</p>
            <p className="small fw-light text-end">""  bubbles@gmail.com.com  "" to access Bubbles</p>
            <p className="small fw-light text-end">""  buttercup@gmail.com.com  "" to access Buttercup</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Index;
