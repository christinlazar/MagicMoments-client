import axios,{AxiosInstance} from 'axios'

const Api:AxiosInstance = axios.create({
    baseURL:'http://localhost:5000/api',
    withCredentials:true
}) 

Api.interceptors.request.use(
    async config => {
        console.log("inside api request interceptors")
        let accessToken = localStorage.getItem('accessToken')
        let userInfo = localStorage.getItem('userInfo')
        let adminInfo = localStorage.getItem('adminInfo')
        if(accessToken && userInfo){
            config.headers.Authorization = `Bearer ${accessToken}`
        }else if(accessToken && adminInfo){
            console.log("for admin")
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    error => Promise.reject(error)
);

Api.interceptors.response.use(
    response => response,
    async error => {
        console.log("inside api response interceptors")
        const orginalRequest = error.config;
        console.log("orginal req is",orginalRequest)
        console.log(error,"is error")
        const userInfo = localStorage.getItem('userInfo')
        if(error.response.status == 401 && userInfo){
            console.log("inside api response interceptors")
            const response = await Api.post('user/refresh-token',{},{withCredentials:true})
            console.log("response is",response)
            if(response.status == 200){
                localStorage.setItem('accessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
                return Api(orginalRequest)
            }
        }else if(error.response.status == 401 && error.response.data.role == 'admin'){
            console.log("from here we can go for a request")
            const response = await Api.post('admin/refresh-token',{},{withCredentials:true})
            console.log("res is",response)
            if(response.status == 200){
                localStorage.setItem('accessToken',response.data.accessToken);
                Api.defaults.headers.common['Authorization'] = `Bearer ` + response.data.accessToken
            }else if(!response.data.refresh){
                    console.log("hiiiiiiiiiiiiiiiiiiiii")
            }
        }else if(error.response.status == 401 && !error.response.data.refresh && error.response.data.accepted != false && error.response.data.role == 'admin'){
            await localStorage.removeItem('accessToken')
            await localStorage.removeItem('adminInfo')
            window.location.href = '/admin'
        }
        return Promise.reject(error)
    }
)

export default Api;