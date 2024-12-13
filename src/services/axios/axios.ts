import axios,{AxiosInstance} from 'axios'
import { Role } from '../../interfaces/TypesAndInterfaces';
const Api:AxiosInstance = axios.create({
    baseURL:'https://christin.fun/api',
    withCredentials:true
}) 
localStorage.debug = '*';
Api.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('accessToken') 
        const adminAccessToken = localStorage.getItem('adminAccessToken') 
        const userInfo = JSON.parse(localStorage.getItem('userInfo')as string)
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo') as string) 
        const vendorInfo = JSON.parse(localStorage.getItem('vendorInfo') as string) 
        const userOtp = localStorage.getItem('userOtp') as string
        const vendorOtp = localStorage.getItem('vendorOtp') as string
        const vendorAccessToken = localStorage.getItem('vendorAccessToken')  
        if(accessToken && userInfo  && !userOtp && !vendorOtp && !window.location.pathname.includes('/admin') && !window.location.pathname.includes('/vendor') ){
            config.headers.Authorization = `Bearer ${accessToken}`
        }else if(adminAccessToken && adminInfo && !userOtp && !vendorOtp && window.location.pathname.includes('/admin') ){
            config.headers.Authorization = `Bearer ${adminAccessToken}`
        }else if( vendorAccessToken && vendorInfo && !userOtp && !vendorOtp ){
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
        if(error.response.status == 401 && error.response?.data?.userBlocked){
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
            const response = await Api.post('user/refresh-token',{},{withCredentials:true})
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
            const response = await Api.post('admin/refresh-token',{},{withCredentials:true})
            if(response.status == 200 && response.data.refresh){
                localStorage.setItem('adminAccessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == Role.Admin){
                alert("Admin Session has been expired, please login again")
                localStorage.removeItem('adminInfo')
                localStorage.removeItem('adminAccessToken')
                   window.location.href = '/admin'
            }
        }else if(error.response.status == 401 && error.response.data.role == Role.Vendor  &&  !originalRequestForVendor._retry ){
            originalRequestForVendor._retry = true
            const response = await Api.post('vendor/refresh-token',{},{withCredentials:true})
            if(response.status == 200 && response.data.refresh){
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