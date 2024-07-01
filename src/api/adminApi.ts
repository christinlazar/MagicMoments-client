
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
    console.log("inside admin login client side")
try {
    const res = await Api.post(adminRoutes.adminlogin,{email,password})
    if(res.data.success){
        localStorage.setItem('accessToken',JSON.stringify(res.data.accessToken))
    }
    return res
} catch (error) {
    console.log(error)
}
}

export const bringUsers = async() =>{
    try {
        console.log("getting in bringUsers")
        const users = await Api.get(adminRoutes.bringUsers)
        console.log("users is",users)
        return users
    } catch (error) {
        
    }
}

export const BlockUser = async (userId:string) =>{
    try {
        const blocked = await Api.post(adminRoutes.blockUser,{userId})
        if(blocked.data.success){
            return blocked
        }
    } catch (error) {
        console.log(error)
    }
}

export const unblockUser = async(userId:string) =>{
    try {
        const unblocked = await Api.post(adminRoutes.unblockUser,{userId})
        console.log(unblocked)
        if(unblocked.data.success){
            return unblocked
        }
    } catch (error) {
        console.log(error)
    }
}
export const bringVendors = async () =>{
    try {
        console.log("bring vendors");
        
        const res = await Api.get(adminRoutes.bringVendors)
       return res
    } catch (error) {
        
    }
}

export const blockVendor = async(vendorId:string) =>{
    try {
        const res = await Api.post(adminRoutes.blockvendor,{vendorId})
        if(res.data.success){
            return res
        }
        console.log(res)
        return res
    } catch (error) {
        
    }
}

export const unblockVendor = async(vendorId:string)=>{
    try {
        const res = await Api.post(adminRoutes.unblockvendor,{vendorId})
        console.log(res)
        return res
    } catch (error) {
        
    }
}

export const acceptVendorReq = async(vendorId:string)=>{
    try {
        console.log("going to accept req from client side")
        const res = await Api.post(adminRoutes.acceptRequest,{vendorId})
        return res
    } catch (error) {
        
    }
}

export const rejectVendorReq = async(vendorId:string)=>{
        try {
            const res = Api.post(adminRoutes.rejectRequest,{vendorId})
            return res
        } catch (error) {
            console.error(error)
        }
}
