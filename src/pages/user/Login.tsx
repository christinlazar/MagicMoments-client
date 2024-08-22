import React, { useEffect, useState } from 'react'
import logo from '../../assets/license (1).png'
import RegisterImage from '../../assets/pexels-imagestudio-1488312.jpg'
import {useLocation, useNavigate,Link} from 'react-router-dom'
import { userLogin } from '../../api/userApi'
import { useDispatch } from 'react-redux'
import { setUserCredentials } from '../../store/slice/AuthSlice'
import {Toaster,toast} from 'sonner'
import Carousel from '../../carousel/Caraousel'
function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
    useEffect(()=>{
      const {state} = location
      if(state){
        // toast.success("User registration has been completed successfully")
      }
      return ()=> state
    },[location])
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const handleSubmit  = async (e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
        try {
           const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(!email.trim() && !password.trim()){
            return toast.error("Fields cant be empty")
          }
          else if(!emailRegex.test(email)){
              return toast.error('Email format is not correct')
          }
          if(!email.trim()){
            return toast.error('Name field must be empty')
          }else if(!password.trim()){
              return toast.error('Password field cant be empty')
          }
          setEmail("")
          setPassword("")
          const result = await userLogin(email,password)
          if(result?.data.success){
             dispatch(setUserCredentials(result.data.accessToken))
             navigate('/',{state:{success:true}})
          }else if(result?.data.blocked){
              toast.error('User has been blocked')
          }else{
            toast.error('Invalid user credentials')
          }
        } catch (error) {
          console.log(error)
        }
    }

    const showError1 = () =>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(email.trim() == ''){
          toast.error('Email field cant be empty')
        }else if(!emailRegex.test(email)){
          toast.error('Email format cant be empty')
        }
    }
    const showError2 = () =>{
      if(password.trim() == ''){
        toast.error('Password field cant be empty')
      }
    }
    console.log("hiiiii")


  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
          {/* <ToastContainer className='Toastify__toast-container--top-right'/> */}
          {/* <Carousel/> */}
        <Toaster richColors position="bottom-right" />

        <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" >
        <div className="text-white" >
          <div className="mb-2 flex flex-col items-center">
            <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
            <h1 className="mb-2 text-2xl text-cyan-950 font-semibold font-montserrat">Magic Moments</h1>
          </div>
          <form  onSubmit={handleSubmit} id='form' >
            <label className='font-serif text-cyan-950'>Email</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError1} value={email} onChange={(e)=>setEmail(e.target.value)}  className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="email"  />
           
            </div>
            <label className='font-serif text-cyan-950'>Password</label>
            <div className="mb-4 text-lg">
              <input  onBlur={showError2}  value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="password" name="password" />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button type="submit" className="rounded-3xl bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">sign in</button>
              <div className='p-2'>
                <Link to='/forgotpassword?forgot=true' className='font-serif text-xs text-slate-900 hover:text-red-500'>Forgot password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login