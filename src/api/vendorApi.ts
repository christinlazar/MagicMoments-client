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
            localStorage.setItem('accessToken',result.data.accessToken)
        }
        return result
    } catch (error) {
        console.log(error)
    }
}