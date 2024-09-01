import { Navigate,Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";

interface RootState{
    auth:{
        userInfo:string
    }
}

const UserLoggedIn = () =>{
    const userInfo = useSelector((state:RootState)=>state.auth)
    return (
        userInfo.userInfo? <Outlet/> : <Navigate to='/login'/>
    )
}

export default UserLoggedIn