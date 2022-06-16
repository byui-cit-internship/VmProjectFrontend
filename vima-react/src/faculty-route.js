import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddClass from './components/faculty/AddClass';
import FacultyDashboard from './FacultyDashboard';

function FacultyRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FacultyDashboard />} />
                <Route path="/addclass" element={<AddClass />} />
            </Routes>
        </Router>
    )
}
export default FacultyRoute;