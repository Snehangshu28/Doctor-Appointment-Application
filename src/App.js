import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector} from 'react-redux';
import Spiner from './components/Spiner';
import ProtectedRout from './components/ProtectedRout';
import PublicRoute from './components/PublicRoute';
import  ApplyDoctor  from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading  ? (<Spiner/>):(
         <Routes>
         <Route path='/' 
         element={
          <ProtectedRout>
             <Home/>
         </ProtectedRout>
         }/>
         <Route path='/apply-doctor' 
         element={
          <ProtectedRout>
             <ApplyDoctor/>
         </ProtectedRout>
         }/>
         <Route path='/admin/users' 
         element={
          <ProtectedRout>
             <Users/>
         </ProtectedRout>
         }/>
         <Route path='/admin/doctors' 
         element={
          <ProtectedRout>
             <Doctors/>
         </ProtectedRout>
         }/>
         <Route path='/notification' 
         element={
          <ProtectedRout>
             <NotificationPage/>
         </ProtectedRout>
         }/>
         <Route path='/login'
          element={
            <PublicRoute>
             <LoginPage/>
            </PublicRoute>
          }/>
         <Route path='/register' 
         element={
          <PublicRoute>
             <RegisterPage/>
           </PublicRoute>
         }/>
       </Routes>
      )}
       
      </BrowserRouter>
    </>
  );
}

export default App;
