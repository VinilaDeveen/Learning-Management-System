import{BrowserRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';
import './App.css'
import AdminLogin from './pages/auth/AdminLogin'
import AdminReg from './pages/adminreg/AdminReg'
import Studenttable from './component/studenttable/Studenttable';
import StudentView from './pages/studentview/StudentView';
import AddStudent from './pages/addtudent/AddStudent';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path='studenttable' element={<Studenttable/>}/>
              <Route path='/studenttable/:studId' element={<StudentView/>}/>
              <Route path='/addStudent' element={<AddStudent/>}/>
            </Route>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/register' element={<AdminReg/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
