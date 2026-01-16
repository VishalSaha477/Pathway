import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminDashboard() {
    const nav = useNavigate();
    const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0
    });

    useEffect(() => {
    //fetch("http://localhost:5000
     fetch("https://pathway-m76o.onrender.com/admin/stats")
        .then(res => res.json())
        .then(data => setStats(data));
    }, []);

    return (
        <div className="container-fluid bg-white vh-100 d-flex flex-column">
             <div className="card border shadow-sm rounded-4">
                    <h1 className=" card-body bg-success shadow-sm border rounded-4 fs-2 text-white fw-semibold text-center">Welcome Admin</h1>
                </div>
            <div className="container mt-5 d-flex flex-column">
                <h2 className="fs-2">Admin Data</h2>
                        <div className="card border d-flex bg-white m-2 mt-4">
                            <div className="card-body border shadow p-2 d-flex flex-column ">
                                <p className="fw-semibold fs-4">Students</p>
                                <span className="small fw-light">Total Students : {stats.students}</span>
                                <button className="btn btn-success p-1 mt-2" onClick={() => nav("student")}>Manage</button>
                            </div>
                        </div>
                         <div className="card border bg-white m-2 mt-4">
                            <div className="card-body border shadow p-2  d-flex flex-column">
                                <p className="fw-semibold fs-4">Teachers</p>
                                <span className="small fw-light">Teachers : {stats.teachers}</span>
                                <button className="btn btn-success p-1 mt-2" onClick={()=> nav("teachers")}>Manage</button>
                            </div>
                        </div>  
                         <div className="card border  bg-white m-2 mt-4">
                            <div className="card-body border shadow p-2 d-flex flex-column">
                                <p className="fw-semibold fs-4">Courses</p>
                                <span className="small fw-light">Courses Listed : {stats.courses}</span>
                                <button className="btn btn-success p-1 mt-2" onClick={() => nav("courses")} >Manage</button>
                            </div>
                        </div>                
            </div>
        </div>
    )
}

export default AdminDashboard;