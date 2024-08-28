
import Api from "../services/axios/axios";
import vendorEndPoints from "../services/endpoints/vendorEndpoint";



export const vendorSignup = async(companyName:string,companyEmail:string,password:string,place:string,category:string)=>{
        try {
            const result = await Api.post(vendorEndPoints.vendorsignUP,{companyName,companyEmail,password,companyLocation:place,category})
            localStorage.setItem('vendorOtp',result.data.token)
            return result
        } catch (error) {
           if(error instanceof Error){
            console.error(error)
       }
        }
}

export const vendorVerifyOtp = async(otp:string)=>{
    try {
    
        const token = localStorage.getItem('vendorOtp')
      
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
       
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const VendorResendOtp = async() =>{
    try {
        
        const token = localStorage.getItem('vendorOtp')
        const result = await Api.post(vendorEndPoints.vendorResendOtp,{},{
            headers:{
                'authorization': `Bearer ${token}`
            }
        })
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const vendorLogin = async (email:string,password:string) =>{
    try {
    
        const result = await Api.post(vendorEndPoints.vendorLogin,{email,password})
   
        if(result.data.accessToken){
            localStorage.setItem('vendorAccessToken',result.data.accessToken)
        }
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const addPhotos = async (formData:any) => {
    try {
        const result = await Api.post(vendorEndPoints.vendorAddPhotos,formData)
      
        if(result){
            return result
        }
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const addVideos = async (FormData:any)=>{
    try {
        const result = await Api.post(vendorEndPoints.vendorAddVideos,FormData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
      
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}
export const addStoreDetails = async (formData:any)=>{
    try {
      
        const result = await Api.post(vendorEndPoints.submitStoreDetials,formData)
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const EditStoreDetails = async (formData:any)=>{
    try {
     
        const result = await Api.post(vendorEndPoints.editStoredetials,{formData})
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const deleteTheService = async (service:string) =>{
    try {
    const result = await Api.post(vendorEndPoints.deleteService,{service})
        return result
    } catch (error) {
        if(error instanceof Error){
            console.error(error)
        }
    }
}

export const getVendorData = async ()=>{
    try {
     
        const result = await Api.get(vendorEndPoints.getVendor)
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const addUnavailableDates = async (dates:string[]) =>{
    try {
        const result = await Api.post(vendorEndPoints.addUnAvaialblesDates,{dates})
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const fetchBookingRequests = async () =>{
    try {
        
        const result = await Api.get(vendorEndPoints.bringBookingRequests)
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const acceptBookingRequest = async (bookingId:string) =>{
    try {
      
        const result = await Api.post(vendorEndPoints.acceptBookingrequest,{bookingId})
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const fetchBookings = async () =>{
    try {
        const result = await Api.get(vendorEndPoints.fetchBookings)
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const addServices = async (serviceData:string[]) =>{
    try {
        const result = await Api.post(vendorEndPoints.addServices,{serviceData:serviceData})
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const bringchats = async () =>{
    try {
        const result = await Api.post(vendorEndPoints.bringChats)
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const bringvendorUserChat = async (userId:string) =>{
    try {
        const result = await Api.post(vendorEndPoints.bringVendorUserchat,{userId})
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const sendMessageToUser = async (conversationId:string,receiverId:string,message:string)=>{
    try {
        const result = await Api.post(vendorEndPoints.sendMessageToUser,{conversationId,receiverId,message})
        return result
    } catch (error) {
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const addLongLang = async (position:any) =>{
    try{
        const result = await Api.post(vendorEndPoints.addlocation,{position})
        return result
    }catch(error){
       if(error instanceof Error){
            console.error(error)
       }
    }
}

export const sendForgotMailFromVendor = async (email:string) =>{
    try {
        const result = await Api.post(vendorEndPoints.sendForgetEmailFromVendor,{email})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const verifyForgetotp = async (otp:string) => {
    try {
        const result = await Api.post(vendorEndPoints.verifyForgetMail,{otp})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const confirmChangingPassword = async (password:string,newPassword:string)=>{
    try {
        const result = await Api.post(vendorEndPoints.confirmChangingpassword,{password,newPassword})
        return result
    } catch (error) {
        console.error(error)
    }
}




