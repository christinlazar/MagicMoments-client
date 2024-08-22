import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './pages/user/Register';
import {BrowserRouter as Router ,Routes,Route, useNavigate, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar';
import Login from './pages/user/Login';
import Home from './pages/user/Home';
// import UserRoutes from './routes/userRoute';
import UserRoute from './routes/userRoute';
import AdminRoute from './routes/adminRoutes';
import VendorRoutes from './routes/vendorRoute';
import { useSelector } from 'react-redux';
import { RootState } from './store/Store';
function App() {
  return (
    <Router>
    <div className="App">
    <div className='content scrollbar-none'>
        <Routes>
          <Route path='/*' element={<UserRoute/>}/>
          <Route path='/admin*' element={<AdminRoute/>}/> 
          <Route path='/vendor*' element={<VendorRoutes/>}/>
        </Routes>
        </div>
      </div>
  </Router>
  );
}

export default App;
