import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from '../src/components/student/studentdashboard';


function StudentRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentDashboard />} />
                {/* <Route path="/addclass" element={} /> */}
            </Routes>
        </Router>
    )
}
export default StudentRoute;