import { useEffect, useState } from "react";
import AdminList from "./AdminList";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: "", email: "" });

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    fetch("https://pathway-m76o.onrender.com/teachers")
      .then(res => res.json())
      .then(data => setTeachers(data));
  }

  const handleToggleStatus = (teacher) => {
    fetch(`https://pathway-m76o.onrender.com/teachers/${teacher.id}/status`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(() => refresh());
  };

  const handleAddTeacher = () => {
    setShowModal(true);
  };

  const handleSaveStudent = () => {
    fetch("https://pathway-m76o.onrender.com/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeacher)
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false);
        setNewTeacher({ name: "", email: "" });
        refresh();
      });
  };

  return (
    <>
    <AdminList
      title="Manage Teachers"
      columns={["Name", "Email", "Status", "Action"]}
      rows={teachers}
      onAdd={handleAddTeacher}
      onRefresh={refresh}
      renderRow={(teacher) => (
        <tr key={teacher.id}>
          <td>{teacher.name}</td>
          <td>{teacher.email}</td>
          <td>{teacher.status}</td>
          <td>
            <button
              className={
                teacher.status === "Active"
                  ? "btn btn-sm btn-danger"
                  : "btn btn-sm btn-success"
              }
              onClick={() => handleToggleStatus(teacher)}
            >
              {teacher.status === "Active" ? "Deactivate" : "Activate"}
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
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher(prev => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  className="form-control"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher(prev => ({ ...prev, email: e.target.value }))
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

export default ManageTeachers;
