import { useNavigate } from "react-router-dom";

function AdminList({
  title,
  columns,
  rows,
  renderRow,
  onAdd,
  onRefresh
}) {
  const nav = useNavigate();

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{title}</h3>
        <button className="btn btn-primary" onClick={onAdd}>
          Add
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(row => renderRow(row))}
        </tbody>
      </table>

      <button className="btn bg-dark text-white" onClick={() => nav(-1)}>
        Back
      </button>
      <button className="btn btn-info mx-3" onClick={onRefresh}>
        Refresh
      </button>

    </div>
  );
}

export default AdminList;
