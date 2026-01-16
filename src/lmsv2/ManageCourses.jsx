import { useEffect, useState } from "react";
import AdminList from "./AdminList";

function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    fetch("http://localhost:5000/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }

  const handleToggleStatus = (course) => {
    fetch(`http://localhost:5000/courses/${course.id}/status`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(() => refresh());
  };

  const handleAddCourse = () => {
    console.log("Add course clicked");
  };

  return (
    <AdminList
      title="Manage Courses"
      columns={["Title", "Description", "Status", "Action"]}
      rows={courses}
      onAdd={handleAddCourse}
      onRefresh={refresh}
      renderRow={(course) => (
        <tr key={course.id}>
          <td>{course.title}</td>
          <td>{course.teacher}</td>
          <td>{course.status}</td>
          <td>
            <button
              className={
                course.status === "Active"
                  ? "btn btn-sm btn-danger"
                  : "btn btn-sm btn-success"
              }
              onClick={() => handleToggleStatus(course)}
            >
              {course.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </td>
        </tr>
      )}
    />
  );
}

export default ManageCourses;
