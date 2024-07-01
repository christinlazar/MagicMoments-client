import axios,{AxiosInstance} from 'axios'
import { toast } from 'sonner';

const Api:AxiosInstance = axios.create({
    baseURL:'http://localhost:5000/api',
    withCredentials:true
}) 

Api.interceptors.request.use(
    async config => {
        console.log("inside api request interceptors")
        let accessToken = localStorage.getItem('accessToken')
        let adminAccessToken = localStorage.getItem('adminAccessToken')
        let userInfo = localStorage.getItem('userInfo')
        let adminInfo = localStorage.getItem('adminInfo')
        let vendorInfo = localStorage.getItem('vendorInfo')
        let userOtp = localStorage.getItem('userOtp')
        let vendorOtp = localStorage.getItem('vendorOtp')
        console.log(window.location.pathname,"pathname")
        if(accessToken && userInfo  && !userOtp &&!vendorOtp && !window.location.pathname.includes('/admin')){
            config.headers.Authorization = `Bearer ${accessToken}`
        }else if(adminAccessToken && adminInfo && !userOtp && !vendorOtp){
            console.log("for admin")
            config.headers.Authorization = `Bearer ${adminAccessToken}`
        }
        return config
    },
    error => Promise.reject(error)
);

Api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.log("error config",error.config)
        console.log("error is",error)
        if(error.response.status == 401 && error.response.data.role == 'user' && !originalRequest._retry){
            originalRequest._retry = true
            console.log("getting here reason:user err");
            const response = await Api.post('user/refresh-token',{},{withCredentials:true})
            console.log("response is",response)
            if(response.status == 200 && response.data.refresh){
                localStorage.setItem('accessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == 'user'){
                 alert("Session has been expired, please login again")
                 localStorage.removeItem('userInfo')
                 localStorage.removeItem('accessToken')
                    window.location.href = '/login'
                
            }
        }else if(error.response.status == 401 && error.response.data.role == 'admin' &&  !originalRequest._retry ){
            originalRequest._retry = true
            console.log("from here we can go for a request")
            const response = await Api.post('admin/refresh-token',{},{withCredentials:true})
            console.log("res is",response)
            if(response.status == 200 && response.data.refresh){
                console.log("setting admin access")
                localStorage.setItem('adminAccessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                console.log("going for original request")
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == 'admin'){
                alert("Session has been expired, please login again")
                localStorage.removeItem('adminInfo')
                localStorage.removeItem('adminAccessToken')
                   window.location.href = '/admin'
            }
        }
        // else if(error.response.status == 401 && !error.response.data.refresh && error.response.data.accepted != false && error.response.data.role == 'admin'){
        //      localStorage.removeItem('accessToken')
        //      localStorage.removeItem('adminInfo')
        //     window.location.href = '/admin'
        // }
        return Promise.reject(error)
    }
)

export default Api;