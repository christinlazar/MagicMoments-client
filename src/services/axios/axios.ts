import axios,{AxiosInstance} from 'axios'


const Api:AxiosInstance = axios.create({
    baseURL:'https://magic-moments-client.vercel.app/api',
    withCredentials:true
}) 

Api.interceptors.request.use(
    async config => {
        let accessToken = localStorage.getItem('accessToken')
        let adminAccessToken = localStorage.getItem('adminAccessToken')
        let userInfo = localStorage.getItem('userInfo')
        let adminInfo = localStorage.getItem('adminInfo')
        let vendorInfo = localStorage.getItem('vendorInfo')
        let userOtp = localStorage.getItem('userOtp')
        let vendorOtp = localStorage.getItem('vendorOtp')
        let vendorAccessToken = localStorage.getItem('vendorAccessToken')
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
        console.log("org for",originalRequest._retry)
        console.log("error config",error.config)
        console.log("error is",error)
        console.log("response data is",error.response.data)
        // if(error.response.data.refresh == false){
        //     return
        // }
        if(error.response.status == 401 && error.response.data.role == 'user' && !originalRequest._retry){
            originalRequest._retry = true
            console.log("getting here reason:user err");
            const response = await Api.post('user/refresh-token',{},{withCredentials:true})
            console.log("response is",response)
            if(response.status == 200 && response.data.refresh){
                localStorage.setItem('accessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == 'user' ){
                 alert("USER Session has been expired, please login again")
                 localStorage.removeItem('userInfo')
                 localStorage.removeItem('accessToken')
                    window.location.href = '/login'
                
            }
        }else if(error.response.status == 401 && error.response.data.role == 'admin' &&  !originalRequestForAdmin._retry ){
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
            }else if(!response.data.refresh && response.data.role == 'admin'){
                alert("Admin Session has been expired, please login again")
                localStorage.removeItem('adminInfo')
                localStorage.removeItem('adminAccessToken')
                   window.location.href = '/admin'
            }
        }else if(error.response.status == 401 && error.response.data.role == 'vendor'  &&  !originalRequestForVendor._retry ){
            originalRequestForVendor._retry = true
            console.log("going to refresh vendor token");
            const response = await Api.post('vendor/refresh-token',{},{withCredentials:true})
            console.log(response)
            if(response.status == 200 && response.data.refresh){
                console.log("ivde vannatundarnnu")
                localStorage.setItem('vendorAccessToken',response.data.vendorAccessToken)
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.vendorAccessToken
                return Api(originalRequest)
            }else if(!response.data.refresh && response.data.role == 'vendor'){
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