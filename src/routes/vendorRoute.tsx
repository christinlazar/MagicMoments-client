import { Route,Routes } from "react-router-dom";
import VendorSignup from "../pages/vendor/vendorSignup";
import VendorLoggedOut from "../components/vendor/vendorLoggedOut";
import VendorLogin from "../pages/vendor/vendorLogin";
import VendorLoggedIn from "../components/vendor/vendorLoggedIn";
import VendorHome from "../pages/vendor/vendorHome";
import VendorNavBar from "../components/vendor/vendorNavBar";

const VendorRoutes = () =>{
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