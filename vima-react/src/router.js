import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./app";
import FacultyDashboard from "./components/faculty/facultydashboard";
import AddClass from "./components/faculty/addclass";
import AddProfessor from "./components/faculty/addprofessor";
import AddVm from "./components/faculty/addvm";
import StudentDashboard from "./components/student/studentdashboard";
import CreateVM from "./components/student/createvm";
import MyVM from "./components/student/myvm";
import Utilization from "./components/faculty/utilization";
import MyNetworks from "./components/student/mynetworks";
import ProfessorList from "./components/faculty/professorlist";
import CreatedSuccessfully from "./components/student/success";
import MyClasses from "./components/faculty/myclasses";
import VerifyEmail from "./verifyemail";
import UseRef from "./useref";
import Popup from "./components/faculty/Popup";

export default function VimaRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/addclass" element={<AddClass />} />
        <Route path="/addprofessor" element={<AddProfessor />} />
        <Route path="/utilization" element={<Utilization />} />
        <Route path="/addvm" element={<AddVm />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/createvm" element={<CreateVM />} />
        <Route path="/myvm" element={<MyVM />} />
        <Route path="/mynetworks" element={<MyNetworks />} />
        <Route path="/professorlist" element={<ProfessorList />} />
        <Route path="/success" element={<CreatedSuccessfully />} />
        <Route path="/myclasses" element={<MyClasses />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/useref" element={<UseRef />} />
      </Routes>
    </Router>
  );
}
