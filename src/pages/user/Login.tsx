import React, { useEffect, useState } from 'react'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/pexels-imagestudio-1488312.jpg'
import {useLocation, useNavigate,Link} from 'react-router-dom'
import { userLogin } from '../../api/userApi'
import { useDispatch } from 'react-redux'
import { setUserCredentials } from '../../store/slice/AuthSlice'
import {Toaster,toast} from 'sonner'
import GoogleAuthSignup from '../../components/user/GoogleAuthSignup'
function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
    useEffect(()=>{
      const {state} = location
      if(state){
      
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
        <h1 className="mb-2 text-2xl text-cyan-950 font-semibold font-montserrat">Magic Moments</h1>
      </div>
      <form onSubmit={handleSubmit} id='form'>
        <label className='font-montserrat text-cyan-950'>Email</label>
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
        
        <label className='font-montserrat text-cyan-950'>Password</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError2}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-xs text-gray-900 font-montserrat  bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="password"
            name="password"
          />
        </div>
        
        <div className="mt-8 flex flex-col justify-center text-lg text-black">
          <button type="submit" className="rounded-3xl text-sm bg-cyan-950 bg-opacity-100 px-10 py-2 mb-2 text-white shadow-xl backdrop-blur-md transition-colors text-md  transform hover:scale-105 hover:transition ease-out duration-300 font-montserrat">Sign In</button>
          <div className='text-center'>
            <Link to='/forgotpassword?forgot=true' className='font-montserrat text-xs text-slate-900 hover:text-black'>Forgot password?</Link>
          </div>
        </div>
      </form>
    </div>
<div>
  <GoogleAuthSignup userlogin={true} user={true}/>
</div>

  </div>
</div>

  )
}

export default Login