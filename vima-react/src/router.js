import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './app';
import FacultyDashboard from "./facultydashboard";
import AddClass from "./components/faculty/addclass";
import AddProfessor from "./components/faculty/addprofessor";
import AddVm from "./components/faculty/addvm";
import StudentDashboard from "./components/student/studentdashboard";

export default function VimaRouter () {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/faculty' element={<FacultyDashboard />} />
                <Route path='/addclass' element={<AddClass />} />
                <Route path='/addprofessor' element={<AddProfessor />} />
                <Route path='/addvm' element={<AddVm />} />
                <Route path='/student' element={<StudentDashboard />} />
            </Routes>
        </Router>
    )
}