import { Route,Routes } from "react-router-dom";
import VendorSignup from "../pages/vendor/vendorSignup";
import VendorLoggedOut from "../components/vendor/vendorLoggedOut";



const VendorRoutes = () =>{
    return (
        <Routes>
            <Route path="" element={<VendorLoggedOut/>}>
                 <Route path="/" element={<VendorSignup/>}/>
            </Route>
        </Routes>
    )
}

export default VendorRoutes