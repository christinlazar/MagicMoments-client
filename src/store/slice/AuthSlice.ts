import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,
    vendorInfo:localStorage.getItem('vendorInfo') ? JSON.parse(localStorage.getItem('vendorInfo') as string):null,
    openUserChat:false,
    openVendorChat:false,
    conversations:[],
    messages:[],
    userNotifications:[],
    vendorNotifications:[],
    videoCallRequest:false
    // adminConversation
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserCredentials:(state,action) =>{
            state.userInfo = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        userLogOut:(state)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accessToken')
        },
        setAdminCredentials:(state,action) =>{
            console.log("reached here")
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogOut:(state) =>{
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
            localStorage.removeItem('adminAccessToken')

        },
        setVendorCredentials:(state,action)=>{
            state.vendorInfo = action.payload
            localStorage.setItem('vendorInfo',JSON.stringify(action.payload))
        },
        vendorLogOut:(state)=>{
            state.vendorInfo = null;
            localStorage.removeItem('vendorInfo')
            localStorage.removeItem('vendorAccessToken')
        },
       setMessages:(state,action)=>{
            state.conversations = action.payload
       },
       addMessages:(state,action:any)=>{
            state.conversations = action.payload
       },
       setAdminMessages:(state,action)=>{
        state.conversations = action.payload
       },
       setRealMessages:(state,action)=>{
            state.messages = action.payload
       },
       setOpenUserChat:(state,action)=>{
        state.openUserChat = action.payload
       },
       setOpenVendorChat:(state,action)=>{
        state.openVendorChat = action.payload
       },
       setUserNotifications:(state,action)=>{
        state.userNotifications = action.payload
       },
       setVendorNotifications:(state,action)=>{
        state.vendorNotifications = action.payload
       },
       setVideCallRequest:(state,action)=>{
        state.videoCallRequest = true
       }

    }
})

export const {setUserCredentials,userLogOut,setAdminCredentials,adminLogOut,setVendorCredentials,vendorLogOut,setMessages,addMessages,setRealMessages,setOpenUserChat,setOpenVendorChat,setUserNotifications,setVendorNotifications,setVideCallRequest} = authSlice.actions
export default authSlice.reducer
