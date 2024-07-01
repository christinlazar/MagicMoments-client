import { Route,Routes } from "react-router-dom";
import VendorSignup from "../pages/vendor/vendorSignup";
import VendorLoggedOut from "../components/vendor/vendorLoggedOut";
import VendorLogin from "../pages/vendor/vendorLogin";
import VendorLoggedIn from "../components/vendor/vendorLoggedIn";
import VendorHome from "../pages/vendor/vendorHome";
import VendorNavBar from "../components/vendor/vendorNavBar";
import { vendorLogOut } from "../store/slice/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const VendorRoutes = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
      const userInfo = localStorage.getItem('userInfo')
      if(!userInfo){
        dispatch(vendorLogOut())
      }
    },[dispatch])
    return (
        <>
           <Routes>
            <Route path="" element={<VendorLoggedOut/>}>
                 <Route path="/" element={<VendorSignup/>}/>
                 <Route path='/vendorLogin' element={<VendorLogin/>}/>
            </Route>
            <Route path="" element={<VendorLoggedIn/>}>
                    <Route path="/vendorHome" element={<VendorHome/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default VendorRoutes