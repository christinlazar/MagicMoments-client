import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Profile from "../pages/user/Profile";
import Home from "../pages/user/Home";
import{Navigate,useNavigate,Route,Routes} from 'react-router-dom'
import UserLoggedOut from "../components/user/userLoggedOut";
import UserLoggedIn from "../components/user/userLoggedIn";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "../store/slice/AuthSlice";
import UserForgotPassword from "../pages/user/userForgotPassword";
import ChangePassword from "../pages/user/ChangePassword";
import SingleVendorView from "../pages/user/SingleVendorView";
import PaymentFailed from "../pages/user/PaymentFailed";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import BookingDetials from "../pages/user/BookingDetials";
// import useAuthentication from "../hooks/useAuthentication";
import BookingRequests from "../pages/user/BookingRequests";
import Photos from "../pages/user/Photos";
import Videos from "../pages/user/Videos";
import Chat from "../pages/user/SingleChat";
interface RootState{
        auth:{
        userInfo:string
        }
}
const UserRoute:React.FC = () => {
        const dispatch = useDispatch()
        useEffect(()=>{
          const userInfo = localStorage.getItem('userInfo')
          if(!userInfo){
            dispatch(userLogOut())
          }
        },[dispatch])
        return(
            <>
            <NavBar/>
               <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='/singleVendorView' element={<SingleVendorView/>}/>
                <Route path='' element={<UserLoggedOut/>}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register'element={<Register/>} />
                        <Route path ='forgotPassword' element={<UserForgotPassword/>}/>
                        <Route path = '/changePassword' element={<ChangePassword/>}/>
                </Route>
                                <Route path='' element={<UserLoggedIn/>}>
                                <Route path= "profile" element={<Profile/>}/>
                                <Route path= '/paymentFailed' element={<PaymentFailed/>}/>
                                <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
                                <Route path='/bookingDetials' element={<BookingDetials/>}/>
                                <Route path='/bookingRequests' element={<BookingRequests/>}/>
                                <Route path='/photos' element={<Photos/>}/>
                                <Route path='/videos' element={<Videos/>}/>
                                <Route path='/singleChat' element={<Chat/>}/>
                                </Route>
              

            </Routes>
            </>
        )
}
export default UserRoute