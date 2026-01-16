import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    fetch(
      `http://localhost:5000/courses/${id}/details?studentId=${user.id}`
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to load course");
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Course not found or server error");
        setLoading(false);
      });
  }, [id]);

  // 🔄 STATES (no blank screens)

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-danger">{error}</p>
        <button className="btn btn-secondary" onClick={() => nav(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-3">Course Details</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <h4 className="fw-semibold">{course.title}</h4>
          <p className="text-muted">{course.description}</p>

          <div className="progress mb-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${course.progress}%` }}
            >
              {course.progress}%
            </div>
          </div>

          <button className="btn btn-primary">
            Continue Learning
          </button>

        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <h5>Instructor</h5>
          <p>{course.teacher}</p>

          <h5>Classmates</h5>
          {course.classmates.length === 0 ? (
            <p className="text-muted small">No classmates enrolled</p>
          ) : (
            <ul>
              {course.classmates.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          )}

        </div>
      </div>

    </div>
  );
}

export default CourseDetails;
