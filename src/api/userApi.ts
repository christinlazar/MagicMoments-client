
import Api from '../services/axios/axios'
import userEndpoint from '../services/endpoints/userEndpoint'
import { userLogOut } from '../store/slice/AuthSlice'

export const signup = async(name:string,email:string,phone:string,password:string,confirmPassword:string) =>{
    try {
        console.log(name,email,password)
        const res = await Api.post(userEndpoint.userSignup,{name,email,phone,password,confirmPassword})
        console.log(res)
        const token = res.data.token
        console.log(token)
        await localStorage.setItem('userOtp',token)
        return res
    } catch (error:any) {
        console.log(error.message)
    }
}
export const verifyOtp = async(otp:string):Promise<any | undefined> =>{
    try {
        console.log("getting in verifyOtp")
        let token = localStorage.getItem('userOtp')
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

