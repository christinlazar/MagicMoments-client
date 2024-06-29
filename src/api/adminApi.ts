
import Api from "../services/axios/axios";
import adminRoutes from "../services/endpoints/adminEndPoint";

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