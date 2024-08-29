import axios,{AxiosInstance} from 'axios'
import { Role } from '../../interfaces/TypesAndInterfaces';
const Api:AxiosInstance = axios.create({
    baseURL:'https://adorehome.site/api',
    withCredentials:true
}) 
localStorage.debug = '*';

Api.interceptors.request.use(
    async config => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken') as string)
        const adminAccessToken = localStorage.getItem('adminAccessToken') 
        const userInfo = JSON.parse(localStorage.getItem('userInfo')as string)
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo') as string) 
        const vendorInfo = JSON.parse(localStorage.getItem('vendorInfo') as string) 
        const userOtp = localStorage.getItem('userOtp') 
        const vendorOtp = localStorage.getItem('vendorOtp') as string
        const vendorAccessToken = JSON.parse(localStorage.getItem('vendorAccessToken') as string) 
        
        if(accessToken && userInfo  && !userOtp && !vendorOtp && !window.location.pathname.includes('/admin') && !window.location.pathname.includes('/vendor') ){
            console.log("for user")
            config.headers.Authorization = `Bearer ${accessToken}`
        }else if(adminAccessToken && adminInfo && !userOtp && !vendorOtp && window.location.pathname.includes('/admin') ){
            console.log("for admin")
            config.headers.Authorization = `Bearer ${adminAccessToken}`
        }else if( vendorAccessToken && vendorInfo && !userOtp && !vendorOtp ){
            console.log("for vendor")
                 config.headers.Authorization = `Bearer ${vendorAccessToken}`
        }
        return config
    },
    error => Promise.reject(error)
);

Api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const originalRequestForAdmin = error.config
        const originalRequestForVendor = error.config
        console.log("error is",error)
        console.log("response data is",error.response.data)
        if(error.response.status == 401 && error.response.data.userBlocked){
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accessToken')
             window.location.href = "/login"
        }
        if(error.response.status == 401 && error.response.data.vendorBlocked){
            localStorage.removeItem('vendorInfo')
            localStorage.removeItem('accessToken')
             window.location.href = "/vendor/vendorLogin"
        }
        if(error.response.status == 401 && error.response.data.role == Role.User && !originalRequest._retry){
            originalRequest._retry = true
            console.log("getting here reason:user err");
            const response = await Api.post('user/refresh-token',{},{withCredentials:true})
            console.log("response is",response)
            if(response.status == 200 && response.data.refresh){
                localStorage.setItem('accessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == Role.User ){
                 alert("USER Session has been expired, please login again")
                 localStorage.removeItem('userInfo')
                 localStorage.removeItem('accessToken')
                    window.location.href = '/login'
                
            }
        }else if(error.response.status == 401 && error.response.data.role == Role.Admin &&  !originalRequestForAdmin._retry ){
            originalRequestForAdmin._retry = true
            console.log("from here we can go for a request")
            const response = await Api.post('admin/refresh-token',{},{withCredentials:true})
            console.log("res is",response)
            if(response.status == 200 && response.data.refresh){
                console.log("setting admin access")
                localStorage.setItem('adminAccessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                console.log("going for original request")
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == Role.Admin){
                alert("Admin Session has been expired, please login again")
                localStorage.removeItem('adminInfo')
                localStorage.removeItem('adminAccessToken')
                   window.location.href = '/admin'
            }
        }else if(error.response.status == 401 && error.response.data.role == Role.Vendor  &&  !originalRequestForVendor._retry ){
            originalRequestForVendor._retry = true
            console.log("going to refresh vendor token");
            const response = await Api.post('vendor/refresh-token',{},{withCredentials:true})
            console.log(response)
            if(response.status == 200 && response.data.refresh){
                console.log("ivde vannatundarnnu")
                localStorage.setItem('vendorAccessToken',response.data.vendorAccessToken)
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.vendorAccessToken
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == Role.Vendor){
                alert("Vendor Session has been expired, please login again")
                localStorage.removeItem('vendorInfo')
                localStorage.removeItem('vendorAccessToken')
                window.location.href = '/vendor/vendorLogin' 
           }  
        }
        return Promise.reject(error)
    }
)

export default Api;