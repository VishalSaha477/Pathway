import { Routes, Route } from "react-router-dom";
import LMSLayout from "./LMSLayout";
import Index from "./Index"

import StudentDashboard from "./StudentDashboard"
import ExploreCourses from "./ExploreCourses"
import CourseDetails from "./CourseDetails"

import AdminDashboard from "./AdminDashboard"
import ManageStudents from "./ManageStudents"
import ManageTeachers from "./ManageTeachers";
import ManageCourses from "./ManageCourses"

function MainScr() {

    return (
            <Routes>
                <Route path="/" element={<LMSLayout><Index/></LMSLayout> } />
                <Route path="admin" element={<LMSLayout><AdminDashboard /></LMSLayout>} />
                <Route path="student" element={<LMSLayout><StudentDashboard /></LMSLayout>} />
                <Route path="student/explore" element={<LMSLayout><ExploreCourses /></LMSLayout>} />
                <Route path="student/course/:id"  element={<LMSLayout><CourseDetails /></LMSLayout>} />
                
                <Route path="admin/student" element={<LMSLayout><ManageStudents/></LMSLayout>} />
                <Route path="admin/teachers" element={<LMSLayout><ManageTeachers/></LMSLayout>} />
                <Route path="admin/courses" element={<LMSLayout><ManageCourses/></LMSLayout>} />
            </Routes>
    )
}

export default MainScr;