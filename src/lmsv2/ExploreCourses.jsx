import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ExploreCourses() {
  const nav = useNavigate();

  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [toast, setToast] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  // 🔹 Load user + courses
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      nav("/");
      return;
    }

    setStudent(user);

    fetch(`https://pathway-m76o.onrender.com/students/${user.id}/explore`)
      .then(res => res.json())
      .then(data => setCourses(data));
  }, [nav]);

  // 🔹 Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  function openEnrollModal(course) {
    setSelectedCourse(course);
  }

  function confirmEnroll() {
    if (!student || !selectedCourse) return;

    setEnrolling(true);

    fetch(`https://pathway-m76o.onrender.com/students/${student.id}/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: selectedCourse.id })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setCourses(prev =>
          prev.map(c =>
            c.id === selectedCourse.id
              ? { ...c, enrolled: 1 }
              : c
          )
        );

        setToast({
          type: "success",
          message: "Enrolled successfully!"
        });

        setSelectedCourse(null);
        setEnrolling(false);

        setTimeout(() => {
          nav(`/student/course/${selectedCourse.id}`);
        }, 1000);
      })
      .catch(() => {
        setToast({
          type: "error",
          message: "Enrollment failed. Try again."
        });
        setEnrolling(false);
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Explore Courses</h2>

      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5>{course.title}</h5>
                <p className="small text-muted">{course.description}</p>

                <span
                  className={
                    course.enrolled
                      ? "badge bg-success"
                      : "badge bg-secondary"
                  }
                >
                  {course.enrolled ? "Enrolled" : "Available"}
                </span>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => nav(`/student/course/${course.id}`)}
                >
                  View
                </button>

                {!course.enrolled && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => openEnrollModal(course)}
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔔 ENROLL MODAL */}
      {selectedCourse && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Confirm Enrollment</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedCourse(null)}
                  disabled={enrolling}
                />
              </div>

              <div className="modal-body">
                Do you want to enroll in{" "}
                <strong>{selectedCourse.title}</strong>?
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  disabled={enrolling}
                  onClick={() => setSelectedCourse(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  disabled={enrolling}
                  onClick={confirmEnroll}
                >
                  {enrolling ? "Enrolling..." : "Yes, Enroll"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 🔔 TOAST */}
      {toast && (
        <div
          className={`position-fixed top-0 end-0 m-3 alert ${
            toast.type === "success"
              ? "alert-success"
              : "alert-danger"
          } shadow`}
          style={{ zIndex: 9999 }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default ExploreCourses;
