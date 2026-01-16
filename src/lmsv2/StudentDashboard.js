import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const nav = useNavigate();
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      nav("/");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "student") {
      nav("/");
      return;
    }

    setStudent(user);

    fetch(`http://localhost:5000/students/${user.id}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data));
  }, [nav]);

  if (!student) return null;

  return (
    <div className="container-fluid bg-white vh-100 d-flex flex-column">

      {/* Header */}
      <div className="card border shadow-sm rounded-4">
        <span className="card-body bg-primary shadow-sm rounded-4 fs-2 text-white fw-semibold text-center">
          Welcome, {student.name}
        </span>
        <span className="card-footer text-end fs-6 text-muted">
          Student Dashboard
        </span>
      </div>

      {/* Enrolled Courses */}
      <div className="container mt-5">
        <h2 className="fs-2 mb-4">Your Enrolled Courses</h2>

        <div className="row">
          {courses.map(course => (
            <div className="col-md-4 my-3" key={course.id}>
              <div className="card border bg-white h-100">

                <div className="card-body shadow-sm">
                  <p className="fw-semibold fs-4">
                    {course.title}
                  </p>

                  <div className="progress mt-3">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{ width: `${course.progress}%` }}
                    >
                      {course.progress}%
                    </div>
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-end">
                  <button className="btn btn-success btn-sm" onClick={() => nav(`course/${course.id}`)}>
                    Continue
                  </button>
                </div>

              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <p className="text-muted">No enrolled courses</p>
          )}
        </div>
      </div>

      {/* Explore */}
      <div className="container mt-auto mb-4 text-center">
        <button
          className="btn btn-dark"
          onClick={() => nav("explore")}
        >
          Explore Courses
        </button>
      </div>

    </div>
  );
}

export default StudentDashboard;
