import { Navigate,Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";

interface RootState{
    auth:{
        adminInfo:string
    }
}

const AdminLoggedOut = () =>{
    const {adminInfo} = useSelector((state:RootState)=> state.auth)
    return(
        adminInfo ?  <Navigate to='/admin/dashboard'/> : <Outlet/> 
    )
}
export default AdminLoggedOut