import { Route,Routes } from "react-router-dom";
import VendorSignup from "../pages/vendor/vendorSignup";
import VendorLoggedOut from "../components/vendor/vendorLoggedOut";
import VendorLogin from "../pages/vendor/vendorLogin";
import VendorLoggedIn from "../components/vendor/vendorLoggedIn";
import { vendorLogOut } from "../store/slice/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import VendorStoreFront from "../pages/vendor/vendorStoreFront";
import AddPhotos from "../pages/vendor/addPhotos";
import AddVideos from "../pages/vendor/addVideos";
import Availability from "../pages/vendor/availability";
import BookingRequests from "../pages/vendor/bookingRequests";
import EventBookings from "../pages/vendor/EventBookings";
import Services from "../pages/vendor/services";
import VendorChat from "../pages/vendor/VendorChat";
import SingleVendorChat from "../pages/vendor/singleVendorChat";
import { VendorVideoCall } from "../pages/vendor/vendorVideoCall";
import AddLocation from "../pages/vendor/addLocation";
import PaymentDetialsVendor from "../pages/vendor/paymentDetials";
import FourNotFourVendor from "../pages/vendor/404Vendor";
import EditDetails from "../pages/vendor/EditDetails";
import VendorForgotPassword from "../pages/vendor/vendorForgotPassword";
import ChangeVendorPassword from "../pages/vendor/changeVendorPassword";
const VendorRoutes = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
      const userInfo = localStorage.getItem('vendorInfo')
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
                 <Route path='/forgotpassword' element={<VendorForgotPassword/>}/>
                 <Route path='/changePassword' element={<ChangeVendorPassword/>}/>
            </Route>
            <Route path="" element={<VendorLoggedIn/>}>
                    <Route path="/vendorStore" element={<VendorStoreFront/>}/>
                    <Route path='/addPhotos' element={<AddPhotos/>}/>
                    <Route path='/addVideos' element={<AddVideos/>}/>
                    <Route path='/dateAvailability' element={<Availability/>}/>
                    <Route path='/bookingRequests' element={<BookingRequests/>}/>
                    <Route path='/eventBookings' element={<EventBookings/>}/>
                    <Route path='/services' element={<Services/>}/>
                    <Route path='/vendorChat' element={<VendorChat/>}/>
                    <Route path='/vendorSingleChat' element={<SingleVendorChat/>}/>
                    <Route path='/vendorVideoCall' element={<VendorVideoCall/>}/>
                    <Route path='/addlocation' element={<AddLocation/>}/>
                    <Route path='/paymentDetials' element={<PaymentDetialsVendor/>}/>
                    <Route path='/editDetails' element={<EditDetails/>}/>
            </Route>
            <Route path="*" element={<FourNotFourVendor/>}/>
        </Routes>
        </>
    )
}

export default VendorRoutes