import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddClass from './components/faculty/addclass';
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