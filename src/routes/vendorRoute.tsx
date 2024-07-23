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
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import VendorStoreFront from "../pages/vendor/vendorStoreFront";
import AddPhotos from "../pages/vendor/addPhotos";
import AddVideos from "../pages/vendor/addVideos";
import Availability from "../pages/vendor/availability";
import BookingRequests from "../pages/vendor/bookingRequests";
import EventBookings from "../pages/vendor/EventBookings";
import Services from "../pages/vendor/services";
const VendorRoutes = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
      const userInfo = localStorage.getItem('vendorInfo')
      if(!userInfo){
        dispatch(vendorLogOut())
      }
    },[dispatch])
    const userInfo = useSelector((state:RootState)=>state.auth)
    return (
        <>
           <Routes>
            <Route path="" element={<VendorLoggedOut/>}>
                 <Route path="/" element={<VendorSignup/>}/>
                 <Route path='/vendorLogin' element={<VendorLogin/>}/>
            </Route>
            <Route path="" element={<VendorLoggedIn/>}>
                    <Route path="/vendorHome" element={<VendorHome/>}/>
                    <Route path="/vendorStore" element={<VendorStoreFront/>}/>
                    <Route path='/addPhotos' element={<AddPhotos/>}/>
                    <Route path='/addVideos' element={<AddVideos/>}/>
                    <Route path='/dateAvailability' element={<Availability/>}/>
                    <Route path='/bookingRequests' element={<BookingRequests/>}/>
                    <Route path='/eventBookings' element={<EventBookings/>}/>
                    <Route path='/services' element={<Services/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default VendorRoutes