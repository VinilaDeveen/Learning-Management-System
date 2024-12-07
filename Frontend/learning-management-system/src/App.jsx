import{BrowserRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';
import './App.css'
import AdminLogin from './pages/auth/AdminLogin'
import AdminReg from './pages/adminreg/AdminReg'
import Studenttable from './component/studenttable/Studenttable';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path='studenttable' element={<Studenttable/>}/>
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
