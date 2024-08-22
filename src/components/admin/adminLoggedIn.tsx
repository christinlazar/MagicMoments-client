import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./adminSideNav";


interface RootState{
    auth:{
        adminInfo:string
    }
}

const AdminLoggedIn = () =>{
    const {adminInfo} = useSelector((state:RootState)=> state.auth)
    return(
        <>
        {adminInfo ? (
          <div className="md:flex">
            <AdminSidebar />
            <div className="flex-grow md:ms-60 mt-10">
                  <Outlet />
            </div>
          </div>
        ) : (
          <Navigate to='/admin' />
        )}
      </>
    )
}

export default AdminLoggedIn