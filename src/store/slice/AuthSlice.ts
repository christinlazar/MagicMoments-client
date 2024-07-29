import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,
    vendorInfo:localStorage.getItem('vendorInfo') ? JSON.parse(localStorage.getItem('vendorInfo') as string):null,
    conversations:{}
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
       }
    }
})

export const {setUserCredentials,userLogOut,setAdminCredentials,adminLogOut,setVendorCredentials,vendorLogOut,setMessages,addMessages} = authSlice.actions
export default authSlice.reducer
