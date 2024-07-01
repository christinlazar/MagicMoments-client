
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../../assets/license (1).png'
import RegisterImage from '../../assets/samantha-gades-x40Q9jrEVT0-unsplash.jpg'
import { Toaster ,toast } from 'sonner'
import { adminLogin } from '../../api/adminApi'
import { FunctionBody } from 'typescript'
import { AxiosResponse } from 'axios'
import { setAdminCredentials } from '../../store/slice/AuthSlice'
import {useDispatch} from 'react-redux'

function AdminLogin() {
    const[email,setEmail] = useState<string>('')
    const[password,setPassword] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        try {
            e.preventDefault()
            setEmail('')
            setPassword('')
        const result:AxiosResponse <any,any>| undefined =  await adminLogin(email,password)
        if(result?.data.success){
          console.log(result.data.accessToken)
          console.log(typeof(result.data.accessToken))
          dispatch(setAdminCredentials(result.data.accessToken))
            navigate('/admin/dashboard')
        }
        } catch (error) {
            
        }
    }
    const showError1 = () =>{

    }
    const showError2 = () =>{

    }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
          {/* <ToastContainer className='Toastify__toast-container--top-right'/> */}
        <Toaster richColors position="bottom-right" />

        <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" >
        <div className="text-white" >
          <div className="mb-2 flex flex-col items-center">
            <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
            <h1 className="mb-2 text-2xl">Magic Moments</h1>
          </div>
          <form  onSubmit={handleSubmit} id='form' >
            <label className='font-serif'>Email</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError1} value={email} onChange={(e)=>setEmail(e.target.value)}  className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="email"  />
              {/* <small className='text-red-500 font-serif'>{error1}</small> */}
            </div>
            <label className='font-serif'>Password</label>
            <div className="mb-4 text-lg">
              <input  onBlur={showError2}  value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="password" name="password" />
              {/* <small className='text-red-500 font-serif'>{error2}</small> */}
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button type="submit" className="rounded-3xl bg-red-600 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin