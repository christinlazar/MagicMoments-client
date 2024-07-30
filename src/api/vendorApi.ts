import { toast } from "sonner";
import Api from "../services/axios/axios";
import vendorEndPoints from "../services/endpoints/vendorEndpoint";



export const vendorSignup = async(companyName:string,companyEmail:string,password:string,place:string,category:string)=>{
        try {
            console.log("getting here in vendor signup a client")
            const result = await Api.post(vendorEndPoints.vendorsignUP,{companyName,companyEmail,password,companyLocation:place,category})
            console.log(result)
            localStorage.setItem('vendorOtp',result.data.token)
            return result
        } catch (error) {
            console.error(error)
        }
}

export const vendorVerifyOtp = async(otp:string)=>{
    try {
        console.log("vendorVerifyOtp");
        
        const token = localStorage.getItem('vendorOtp')
        console.log("vendor otp is",token)
        const result = await Api.post(vendorEndPoints.vendorVerifyOtp,{otp},{
            headers:{
                'authorization': `Bearer ${token}`
            }
        })
        if(result.data.success){
            localStorage.removeItem('vendorOtp')
        }else if(result.data.session == false){
            localStorage.removeItem('vendorOtp')
            return result
        }
        console.log("result of verify otp is",result)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const VendorResendOtp = async(otp:string) =>{
    try {
        const result = await Api.post(vendorEndPoints.vendorResendOtp,{otp})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const vendorLogin = async (email:string,password:string) =>{
    try {
        console.log("getting here in vendor login")
        const result = await Api.post(vendorEndPoints.vendorLogin,{email,password})
        console.log("result is -",result)
        if(result.data.accessToken){
            localStorage.setItem('vendorAccessToken',result.data.accessToken)
        }
        return result
    } catch (error) {
        console.log(error)
    }
}

export const addPhotos = async (formData:any) => {
    try {
        const result = await Api.post(vendorEndPoints.vendorAddPhotos,formData)
        console.log("photos added successfulyy",result)
        if(result){
            return result
        }
    } catch (error) {
        console.error(error)
    }
}

export const addVideos = async (FormData:any)=>{
    try {
        const result = await Api.post(vendorEndPoints.vendorAddVideos,FormData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log("videos added successfully",result)
        return result
    } catch (error) {
        
    }
}
export const addStoreDetails = async (formData:any)=>{
    try {
        console.log(formData)
        const result = await Api.post(vendorEndPoints.submitStoreDetials,formData)
        return result
    } catch (error) {
        
    }
}

export const getVendorData = async ()=>{
    try {
        console.log("here in getvendata")
        const result = await Api.get(vendorEndPoints.getVendor)
        return result
    } catch (error) {
        console.log(error)
    }
}

// export const getVendors = async () =>{
//     try {
//         const result = await Api.get(vendorEndPoints.getAllVendors)
//         return result
//     } catch (error) {
        
//     }
// }

// export const bringThatVendor = async (vendorId:string) =>{
//     try {
//         console.log("In bring that vendor");
        
//         const result = await Api.post(vendorEndPoints.bringVendorDetail,{vendorId})
//         return result
//     } catch (error) {
        
//     }
// }

export const addUnavailableDates = async (dates:string[]) =>{
    try {
        const result = await Api.post(vendorEndPoints.addUnAvaialblesDates,{dates})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const fetchBookingRequests = async () =>{
    try {
        
        const result = await Api.get(vendorEndPoints.bringBookingRequests)
        return result
    } catch (error) {
        
    }
}

export const acceptBookingRequest = async (bookingId:string) =>{
    try {
        console.log("in acceptance");
        const result = await Api.post(vendorEndPoints.acceptBookingrequest,{bookingId})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const fetchBookings = async () =>{
    try {
        const result = await Api.get(vendorEndPoints.fetchBookings)
        return result
    } catch (error) {
        
    }
}

export const addServices = async (serviceData:string[]) =>{
    try {
        const result = await Api.post(vendorEndPoints.addServices,{serviceData:serviceData})
        return result
    } catch (error) {
        
    }
}

export const bringchats = async () =>{
    try {
        const result = await Api.post(vendorEndPoints.bringChats)
        return result
    } catch (error) {
        
    }
}

export const bringvendorUserChat = async (userId:string) =>{
    try {
        const result = await Api.post(vendorEndPoints.bringVendorUserchat,{userId})
        return result
    } catch (error) {
        console.log(error)
    }
}

export const sendMessageToUser = async (conversationId:string,receiverId:string,message:string)=>{
    try {
        const result = await Api.post(vendorEndPoints.sendMessageToUser,{conversationId,receiverId,message})
        return result
    } catch (error) {
        console.log(error)
    }
}