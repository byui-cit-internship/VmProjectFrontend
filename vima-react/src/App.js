import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddProffesor from './components/faculty/addprofessor';
import AddClass from './components/faculty/AddClass';
import CanvasToken from './components/faculty/canvastoken';

function App() {
  const routes = [
    // {path: '/', name: 'home', Component: },
    // {path: '/login', name: 'login', Component: },
    // {path: '/faculty', name: 'faculty', Component: },
    // {path: '/student', name: 'student', Component: },
    {path: '/faculty/canvasToken', name: 'canvasToken', Component: CanvasToken},
    // {path: '/admin/utilization', name: 'utilization', Component: },
    // {path: '/student/vm/createVM', name: 'createVM', Component: },
    // {path: '/student/vm/vmHistory', name: 'vmHistory', Component: },
    {path: '/faculty/addClass', name: 'addClass', Component: AddClass},
    // {path: '/faculty/createNetwork', name: 'createNetwork', Component: },
    // {path: '/faculty/createVLAN', name: 'createVLAN', Component: },
    {path: '/admin/addProffesor', name: 'addProffessor', Component: AddProffesor},
  ];
  
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component, name }) => (
            <Route
              exact
              key={name}
              path={path}
              element={<Component className="page" />}
            />
          ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
