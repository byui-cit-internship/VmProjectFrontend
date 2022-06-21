import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddClass from './components/faculty/addclass';
import FacultyDashboard from './facultydashboard';
import AddProfessor from './components/faculty/addprofessor';
import Utilization from './components/faculty/utilization';

function FacultyRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FacultyDashboard />} />
                <Route path="/addclass" element={<AddClass />} />
                <Route path="/addprofessor" element={<AddProfessor />} />
                <Route path="/utilization" element={<Utilization />} />
            </Routes>
        </Router>
    )
}
export default FacultyRoute;