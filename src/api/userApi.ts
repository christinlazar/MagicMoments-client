
import Api from '../services/axios/axios'
import userEndpoint from '../services/endpoints/userEndpoint'
import { bookingDataInterface } from '../pages/user/SingleVendorView'
import axios from 'axios'
import { jwtDecode} from 'jwt-decode'
export const signup = async(name:string,email:string,phone:number,password:string,confirmPassword:string) =>{
    try {
      
        const res = await Api.post(userEndpoint.userSignup,{name,email,phone,password,confirmPassword})
     
        const token = res.data.token
   
         localStorage.setItem('userOtp',token)
        return res
    } catch (error) {
        if(error instanceof Error){
            console.error(error)
       }
    }
}
export const verifyOtp = async(otp:string):Promise<any | undefined> =>{
    try {
       
        let token = localStorage.getItem('userOtp')
        const decoded:any =  jwtDecode(token as string)
        if(decoded.otp != otp){
            return false
        }
        const res = await Api.post(userEndpoint.verifyOtp,{otp },{
            headers:{
                'authorization':`Bearer ${token}`
            }
        });
        console.log(" in verifying otp",res)
        if(res.data.success){
            localStorage.removeItem('userOtp')
        }
        return res
    } catch (error){
        if(error instanceof Error){
            console.error(error)
       }
    }
}
export const userLogin = async(email:string,password:string) =>{
    try {
        const res = await Api.post(userEndpoint.Login,{email,password})
        if(res.data.success){
            localStorage.setItem('accessToken',res.data.accessToken)
        }
        return res
    } catch (error) {
        if(error instanceof Error){
            console.error(error)
       }
    }
}

export const profileSubmission = async(content:string) =>{
        try {
            const res = await Api.post(userEndpoint.profileSubmit,{content})
        } catch (error) {
            if(error instanceof Error){
                console.error(error)
           }
        }
}

export const ResendOtp = async () =>{
        try {
            const token = localStorage.getItem('userOtp')
            const res = await Api.post(userEndpoint.resendOtp,{},{
                headers:{
                    'authorization':`Bearer ${token}`
                }
            })
            if(res){
              localStorage.setItem('userOtp',res.data.resendedToken)
              return res
            }
        } catch (error) {
            if(error instanceof Error){
                console.error(error)
           }
        }
}

export const sendForgotMail = async (email:string) =>{
    try{
        const res = await Api.post(userEndpoint.forgotPassword,{email})
        return res
    }catch(error){
        if(error instanceof Error){
            console.error(error)
       }
    }
}

export const verifyForgotOtp = async(otp:string) =>{
try {
    const res = await Api.post(userEndpoint.verifyForgotOtp,{otp})
    return res
} catch (error) {
    if(error instanceof Error){
        console.error(error)
   }
}
}

export const changePassword = async(newPassword:string,newPasswordConfirm:string) =>{
    try {
        const res = await Api.post(userEndpoint.changepassword,{newPassword,newPasswordConfirm})
        return res
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const getVendors = async () =>{
    try {
        const result = await Api.get(userEndpoint.getAllVendors)
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const bringThatVendor = async (vendorId:string) =>{
    try {
        const result = await Api.post(userEndpoint.bringVendorDetail,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const handleStripePayment = async (companyName:string | undefined,vendorId:string | undefined,amount:string | undefined,bookingData:any) =>{
    try {
        const result = await Api.post(userEndpoint.stripePayment,{companyName,vendorId,amount,bookingData})
      
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const SendBookingRequest = async (bookingData:bookingDataInterface) =>{
    try {
       
        const result = await Api.post(userEndpoint.sendbookingrequest,{bookingData})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const checkIsReqAccepted = async (vendorId:string | undefined) =>{
    try {
        const result = await Api.post(userEndpoint.checkIsBookingAccepted,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const  isExistingBookingRequest = async (vendorId:string | undefined) =>{
    try {
        const result = await Api.post(userEndpoint.checkIsBookingExisting,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const fetchBookingDetials = async () => {
    try{
        const result = await Api.post(userEndpoint.fetchBookingDetials)
        return result
    }catch(error){
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const fetchBookingRequests = async () =>{
    try {
        const result = await Api.post(userEndpoint.fetchBookingRequests)
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const cancelBookingRequest = async (bookingId:string) =>{
    try {
        const result = await Api.post(userEndpoint.cancelBooking,{bookingId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const showPhotosToUser = async (vendorId:string) =>{
    try {
        const result = await Api.post(userEndpoint.bringPhotos,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const showVideosToUser = async (vendorId:string) =>{
    try {
        const result = await Api.post(userEndpoint.bringVideos,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const getVendorChat = async (vendorId:string | undefined)=>{
    try {
        const result = await Api.post(userEndpoint.getVendorChat,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}
export const sendmessage = async (message:string,conversationId:string,senderModel:'User'|'Vendor',receiverId:string,receiverModel:'User' | 'Vendor') =>{
    try {
        const result = await Api.post(userEndpoint.sendMessage,{message,conversationId,senderModel,receiverId,receiverModel})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const sendVideoCallReq = async () =>{
    try {
        const result = await Api.post(userEndpoint.sendVideoMessageReq)
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}
export const submitReview = async (review:string,rating:number,vendorId:any) =>{
    try {
        const result = await Api.post(userEndpoint.sendReview,{review,rating,vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const getReviews = async (vendorId:string | undefined) =>{
    try {
       
        const result = await Api.post(userEndpoint.getreviews,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const searchVendor = async (searchValue:string) =>{
    try {
        const result = await Api.post(userEndpoint.searchForVendor,{searchValue})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const fetchPlaces = async (place:string,radius = 500) => {
    try {
       
        const response = await Api.post(userEndpoint.fetchplaces,{place,radius})
      
        return response 
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const wishlist = async (vendorId:string | null | undefined)=>{
    try {
        const result = await Api.post(userEndpoint.addToWishlist,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const getUserData = async() =>{
    try {
        const result = await Api.get(userEndpoint.getUserdata)
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const getVendorsFromWishlist = async() =>{
    try {
        const result = await Api.get(userEndpoint.getWishListData)
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const removeVendorWishlist = async (vendorId:string) =>{
    try {
        const result = await Api.post(userEndpoint.removeFromWishlist,{vendorId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const editReview = async (review:string,reviewId:string) =>{
    try{
        const result = await Api.post(userEndpoint.editreview,{review,reviewId})
        return result
    }catch(error){
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const searchCompany = async (companyName:string) =>{
    try {
        const result = await Api.post(userEndpoint.searchByCompanyName,{companyName})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}
export const sortbyDate = async (startDate:string,endDate:string) =>{
    try {
        const result = await Api.post(userEndpoint.sortbydate,{startDate,endDate})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}
export const cancelBooking = async(bookingId:string) =>{
    try {
        const result = await Api.post(userEndpoint.cancelbooking,{bookingId})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const filterByPrice = async (criteria:string) =>{
    try {
        const result = await Api.post(userEndpoint.filterbyprice,{criteria})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const gsignUp = async (tokenResponse:any) => {
    try {
        const result = await Api.post(userEndpoint.gSignup,{tokenResponse})
        return result
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}

export const glogin = async (tokenResponse:any) => {
    try {
        const result = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
            headers:{
                'Authorization':`Bearer ${tokenResponse.access_token}`
            }
        })
      
        return result.data
    } catch (error) {
         if(error instanceof Error){
            console.error(error)
       }
    }
}


