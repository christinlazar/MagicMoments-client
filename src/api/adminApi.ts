
import Api from "../services/axios/axios";
import adminRoutes from "../services/endpoints/adminEndPoint";
import { vendorLogOut,userLogOut } from "../store/slice/AuthSlice";
import { UseSelector, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
interface RootState{
    auth:{
        userInfo:string
    }
}

export const adminLogin = async (email:string,password:string) =>{
   
try {
    const res = await Api.post(adminRoutes.adminlogin,{email,password})
    if(res.data.success){
        localStorage.setItem('adminAccessToken',JSON.stringify(res.data.accessToken))
    }
    return res
} catch (error:any) {
    console.error(error)
}
}

export const bringUsers = async() =>{
    try {
      
        const users = await Api.get(adminRoutes.bringUsers)
       
        return users
    } catch (error:any) {
        console.error(error)
    }
}

export const BlockUser = async (userId:string) =>{
    try {
        const blocked = await Api.post(adminRoutes.blockUser,{userId})
        if(blocked.data.success){
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accessToken')
            return blocked
        }
    } catch (error:any) {
        console.error(error)
    }
}

export const unblockUser = async(userId:string) =>{
    try {
        const unblocked = await Api.post(adminRoutes.unblockUser,{userId})
        
        if(unblocked.data.success){
            return unblocked
        }
    } catch (error:any) {
        console.error(error)
    }
}
export const bringVendors = async () =>{
    try {
     
        
        const res = await Api.get(adminRoutes.bringVendors)
       return res
    } catch (error:any) {
        console.error(error)
    }
}

export const blockVendor = async(vendorId:string) =>{
    try {
        const res = await Api.post(adminRoutes.blockvendor,{vendorId})
        if(res.data.success){
            return res
        }
     
        return res
    } catch (error:any) {
        console.error(error)
    }
}

export const unblockVendor = async(vendorId:string)=>{
    try {
        const res = await Api.post(adminRoutes.unblockvendor,{vendorId})
      
        return res
    } catch (error:any) {
        console.error(error)
    }
}

export const acceptVendorReq = async(vendorId:string)=>{
    try {
       
        const res = await Api.post(adminRoutes.acceptRequest,{vendorId})
        return res
    } catch (error:any) {
        console.error(error)
    }
}

export const rejectVendorReq = async(vendorId:string)=>{
        try {
            const res = Api.post(adminRoutes.rejectRequest,{vendorId})
            return res
        } catch (error:any) {
            console.error(error)
        }
}

export const monthlyBooking = async () =>{
    try {
      
        const result = await Api.get(adminRoutes.getMonthlyBooking)
        return result
    } catch (error:any) {
        console.error(error)
    }
}

export const  getUsersVendors = async () =>{
    try {
        const result = await Api.get(adminRoutes.getUsersVendors)
        return result
    } catch (error:any) {
        console.error(error)
    }
}

export const yearlyBooking = async () =>{
    try {
        const result = await Api.get(adminRoutes.getYearlyBooking)
        return result
    } catch (error:any) {
        console.error(error)
    }
}

export const weeklyBooking = async () =>{
    try {
        const result = await Api.get(adminRoutes.getWeeklyBooking)
        return result
    } catch (error:any) {
        console.error(error)
    }
}

export const fetchbookings = async () =>{
    try {
        const result = await Api.get(adminRoutes.getBookings)
        return result
    } catch (error:any) {
        console.error(error)
    }
}

export const bringFilteredData = async (startDate:string,endDate:string) =>{
    try {
        const result = await Api.post(adminRoutes.sortByDate,{startDate,endDate})
        return result
    } catch (error:any) {
       console.error(error)
    }
}


