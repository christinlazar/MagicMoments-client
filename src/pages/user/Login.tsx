import React, { useEffect, useState } from 'react'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/pexels-imagestudio-1488312.jpg'
import {useLocation, useNavigate,Link} from 'react-router-dom'
import { userLogin } from '../../api/userApi'
import { useDispatch } from 'react-redux'
import { setUserCredentials } from '../../store/slice/AuthSlice'
import {Toaster,toast} from 'sonner'
import Carousel from '../../carousel/Caraousel'
import GoogleAuthSignup from '../../components/user/GoogleAuthSignup'
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
        } catch (error:Error | any ) {
          console.error(error)
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

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
  <Toaster richColors position="bottom-right" />

  <div className="rounded-xl  bg-white bg-opacity-20 m-4 my-12 px-6 py-10 shadow-lg backdrop-blur-[2px] max-w-md w-full">
    <div className="text-white">
      <div className="mb-2 flex flex-col items-center">
        <img className='my-4' src={logo} width="50" alt="Magic Moments Logo" />
        <h1 className="mb-2 text-2xl text-cyan-950 font-semibold font-serif">Magic Moments</h1>
      </div>
      <form onSubmit={handleSubmit} id='form'>
        <label className='font-serif text-cyan-950'>Email</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-xs text-gray-900 font-montserrat bg-opacity-10 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="text"
            name="email"
          />
        </div>
        
        <label className='font-serif text-cyan-950'>Password</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError2}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-xs text-gray-900 font-montserrat  bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="password"
            name="password"
          />
        </div>
        
        <div className="mt-8 flex flex-col justify-center text-lg text-black">
          <button type="submit" className="rounded-3xl bg-cyan-950 bg-opacity-100 px-10 py-2 mb-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">Sign In</button>
          <div className='text-center'>
            <Link to='/forgotpassword?forgot=true' className='font-serif text-xs text-slate-900 hover:text-black'>Forgot password?</Link>
          </div>
        </div>
      </form>
    </div>
    {/* <div className="mt-2 text-lg">
  <button className="ms-4 sm:ms-10 lg:ms-24 max-w-xs flex items-center py-2 px-4 sm:px-6 text-sm font-semibold text-center font-montserrat align-middle rounded-lg border border-white/25 gap-2 sm:gap-3 text-black bg-transparent cursor-pointer transition-transform duration-250 ease-[cubic-bezier(0,0.87,0.12,1)] hover:scale-[1.025] active:scale-[0.975]">
    <svg
      viewBox="0 0 256 262"
      preserveAspectRatio="xMidYMid"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 sm:h-6 w-auto"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      ></path>
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      ></path>
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      ></path>
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      ></path>
    </svg>
    Sign in with Google
  </button>
</div> */}
<div>
  <GoogleAuthSignup userlogin={true} user={true}/>
</div>

  </div>
</div>

  )
}

export default Login