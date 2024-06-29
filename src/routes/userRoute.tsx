import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Profile from "../pages/user/Profile";
import Home from "../pages/user/Home";
import{Route,Routes} from 'react-router-dom'
import UserLoggedOut from "../components/user/userLoggedOut";
import UserLoggedIn from "../components/user/userLoggedIn";
import NavBar from "../components/NavBar";

const UserRoute = () => {
        return(
            <>
            <NavBar/>
               <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='' element={<UserLoggedOut/>}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register'element={<Register/>} />
                </Route>
                <Route path='' element={<UserLoggedIn/>}>
                <Route path= "profile" element={<Profile/>}/>
                </Route>
            </Routes>
            </>
        )
}
export default UserRoute