import{BrowserRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';
import './App.css'
import AdminLogin from './pages/auth/AdminLogin'
import AdminReg from './pages/adminreg/AdminReg'
import Studenttable from './component/studenttable/Studenttable';
import StudentView from './pages/studentview/StudentView';
import AddStudent from './pages/addtudent/AddStudent';
import Examtable from './component/examtable/Examtable';
import AddExam from './pages/addexam/AddExam';
import Marktable from './component/marktamble/Marktable';
import Scheduletble from './component/scheduletable/Scheduletble';
import AddSchedule from './pages/addschedule/AddSchedule';
import ScheduleView from './pages/scheduleview/ScheduleView';

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
              <Route path='/examtable' element={<Examtable/>}/>
              <Route path='/examtable/addExam' element={<AddExam/>}/>
              <Route path='/examtable/:examId' element={<Marktable/>}/>
              <Route path='/scheduletable' element={<Scheduletble/>}/>
              <Route path='/scheduletable/addschedule' element={<AddSchedule/>}/>
              <Route path='/scheduletable/:id' element={<ScheduleView/>}/>
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
