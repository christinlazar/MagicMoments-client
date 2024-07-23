
import Api from '../services/axios/axios'
import userEndpoint from '../services/endpoints/userEndpoint'
import { userLogOut } from '../store/slice/AuthSlice'
import { bookingDataInterface } from '../pages/user/SingleVendorView'
export const signup = async(name:string,email:string,phone:number,password:string,confirmPassword:string) =>{
    try {
        console.log(name,email,password)
        const res = await Api.post(userEndpoint.userSignup,{name,email,phone,password,confirmPassword})
        console.log(res)
        const token = res.data.token
        console.log(token)
         localStorage.setItem('userOtp',token)
        return res
    } catch (error:any) {
        console.log(error.message)
    }
}
export const verifyOtp = async(otp:string):Promise<any | undefined> =>{
    try {
        console.log("getting in verifyOtp")
        let token = localStorage.getItem('userOtp')
        console.log("userOtp is")
        const res = await Api.post(userEndpoint.verifyOtp,{otp},{
            headers:{
                'authorization':`Bearer ${token}`
            }
        });
        if(res.data.success){
            localStorage.removeItem('userOtp')
        }
        return res
    } catch (error){
        console.log(error)
    }
}
export const userLogin = async(email:string,password:string) =>{
    try {
        console.log("getting in userLogin client")
        const res = await Api.post(userEndpoint.Login,{email,password})
        console.log(res)
        if(res.data.success){
            localStorage.setItem('accessToken',JSON.stringify(res.data.accessToken))
        }
        return res
    } catch (error) {
        console.log(error)
    }
}

export const profileSubmission = async(content:string) =>{
        try {
            const res = await Api.post(userEndpoint.profileSubmit,{content})
        } catch (error) {
            console.log(error)
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
              console.log(res)
              localStorage.setItem('userOtp',res.data.resendedToken)
              return res
            }
        } catch (error) {
            console.log(error)
        }
}

export const sendForgotMail = async (email:string) =>{
    try{
        const res = await Api.post(userEndpoint.forgotPassword,{email})
        return res
    }catch(error){
        console.error(error)
    }
}

export const verifyForgotOtp = async(otp:string) =>{
try {
    const res = await Api.post(userEndpoint.verifyForgotOtp,{otp})
    return res
} catch (error) {
    console.log(error)
}
}

export const changePassword = async(newPassword:string,newPasswordConfirm:string) =>{
    try {
        const res = await Api.post(userEndpoint.changepassword,{newPassword,newPasswordConfirm})
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getVendors = async () =>{
    try {
        const result = await Api.get(userEndpoint.getAllVendors)
        return result
    } catch (error) {
        
    }
}

export const bringThatVendor = async (vendorId:string) =>{
    try {
        console.log("In bring that vendor");
        
        const result = await Api.post(userEndpoint.bringVendorDetail,{vendorId})
        return result
    } catch (error) {
        
    }
}

export const handleStripePayment = async (companyName:string | undefined,vendorId:string | undefined,amount:string | undefined,bookingData:any) =>{
    try {
        const result = await Api.post(userEndpoint.stripePayment,{companyName,vendorId,amount,bookingData})
        console.log("resssssssss is",result)
        return result
    } catch (error) {
        
    }
}

export const SendBookingRequest = async (bookingData:bookingDataInterface) =>{
    try {
        console.log("bookingdata is",bookingData)
        const result = await Api.post(userEndpoint.sendbookingrequest,{bookingData})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const checkIsReqAccepted = async (vendorId:string | undefined) =>{
    try {
        const result = await Api.post(userEndpoint.checkIsBookingAccepted,{vendorId})
        return result
    } catch (error) {
        
    }
}

export const  isExistingBookingRequest = async (vendorId:string | undefined) =>{
    try {
        const result = await Api.post(userEndpoint.checkIsBookingExisting,{vendorId})
        console.log("result isssssss",result)
        return result
    } catch (error) {
        
    }
}

export const fetchBookingDetials = async () => {
    try{
        const result = await Api.post(userEndpoint.fetchBookingDetials)
        return result
    }catch(error){
        console.error(error)
    }
}

export const fetchBookingRequests = async () =>{
    try {
        const result = await Api.post(userEndpoint.fetchBookingRequests)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const cancelBookingRequest = async (bookingId:string) =>{
    try {
        const result = await Api.post(userEndpoint.cancelBooking,{bookingId})
        return result
    } catch (error) {
        
    }
}

export const showPhotosToUser = async (vendorId:string) =>{
    try {
        const result = await Api.post(userEndpoint.bringPhotos,{vendorId})
        return result
    } catch (error) {
        console.error(error)
    }
}

