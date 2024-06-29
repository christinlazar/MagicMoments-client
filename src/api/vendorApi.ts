import Api from "../services/axios/axios";
import vendorEndPoints from "../services/endpoints/vendorEndpoint";



export const vendorSignup = async(companyName:string,companyEmail:string,category:string,companyLocation:string)=>{
        try {
            const result = await Api.post(vendorEndPoints.vendorsignUP,{companyName,companyEmail,category,companyLocation})
            return result
        } catch (error) {
            console.error(error)
        }
}

export const vendorVerifyOtp = async(otp:string)=>{
    try {
        const result = await Api.post(vendorEndPoints.vendorVerifyOtp,{otp})
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