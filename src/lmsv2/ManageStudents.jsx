import { useState, useEffect } from "react";
import AdminList from "./AdminList";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    fetch("https://pathway-m76o.onrender.com/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }

  const handleToggleStatus = (student) => {
    fetch(`hhttps://pathway-m76o.onrender.com/students/${student.id}/status`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(() => refresh());
  };

  const handleAddStudent = () => {
    setShowModal(true);
  };

  const handleSaveStudent = () => {
    fetch("https://pathway-m76o.onrender.com/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent)
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false);
        setNewStudent({ name: "", email: "" });
        refresh();
      });
  };

  return (
    <>
      <AdminList
        title="Manage Students"
        columns={["Name", "Email", "Status", "Action"]}
        rows={students}
        onAdd={handleAddStudent}
        onRefresh={refresh}
        renderRow={(student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.status}</td>
            <td>
              <button
                className={
                  student.status === "Active"
                    ? "btn btn-sm btn-danger"
                    : "btn btn-sm btn-success"
                }
                onClick={() => handleToggleStatus(student)}
              >
                {student.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </td>
          </tr>
        )}
      />

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  placeholder="Name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent(prev => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  className="form-control"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent(prev => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveStudent}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageStudents;
