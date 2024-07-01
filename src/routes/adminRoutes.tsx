import { Routes , Route } from "react-router-dom"
import AdminLoggedOut from "../components/admin/adminLoggedOut"
import AdminLoggedIn from "../components/admin/adminLoggedIn"
import AdminLogin from "../pages/admin/AdminLogin"
import AdminNavBar from "../components/admin/adminNavBar"
import Users from "../pages/admin/Users"
import AdminSidebar from "../components/admin/adminSideNav"
import AdminDashBoard from "../pages/admin/AdminDashBoard"
import Vendors from "../pages/admin/Vendors"
import Requests from "../pages/admin/Requests"
const AdminRoute = () =>{
    return(
        <>
            <Routes>
            <Route path='' element={<AdminLoggedOut/>}>
                <Route path='' element={<AdminLogin/>} />
            </Route>
            <Route path='' element={<AdminLoggedIn/>}>
                <Route path='/users' element={<Users/>}/>
                <Route path='/dashboard' element={<AdminDashBoard/>}/>
                <Route path='/vendors' element={<Vendors/>}/>
                <Route path='/requests' element={<Requests/>}/>
            </Route>
            </Routes>
        </>
    )
}
export default AdminRoute