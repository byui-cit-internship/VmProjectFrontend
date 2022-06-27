import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddClass from './components/faculty/addclass';
import FacultyDashboard from './facultydashboard';
import AddProfessor from './components/faculty/addprofessor';
import Utilization from './components/faculty/utilization';
import AddVm from './components/faculty/addvm';

function FacultyRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FacultyDashboard />} />
                <Route path="/addclass" element={<AddClass />} />
                <Route path="/addprofessor" element={<AddProfessor />} />
                <Route path="/utilization" element={<Utilization />} />
                <Route path="/addvm" element={<AddVm />} />
            </Routes>
        </Router>
    )
}
export default FacultyRoute;