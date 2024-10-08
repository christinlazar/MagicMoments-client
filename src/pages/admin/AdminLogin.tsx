
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/samantha-gades-x40Q9jrEVT0-unsplash.jpg'
import { Toaster ,toast } from 'sonner'
import { adminLogin } from '../../api/adminApi'
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
            if(email.trim() == '' && password.trim() == ''){
              return toast.error("Email & password cant be empty")
            }
            if(email.trim() == '' ){
              return toast.error('Email cant be empty')
            }
            if(password.trim() == ''){
              return toast.error("Password can't be empty")
            }
        const result:AxiosResponse <any,any>| undefined =  await adminLogin(email,password)
        if(result?.data.success){
          dispatch(setAdminCredentials(result.data.accessToken))
            navigate('/admin/dashboard')
        }
        } catch (error) {
            
        }
    }
 
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
    <Toaster richColors position="bottom-right" />
  
    <div className="rounded-xl bg-white bg-opacity-20 mx-4 my-12 px-8 py-10 shadow-lg backdrop-blur-[2px] sm:max-w-md max-w-full">
      <div className="text-white">
        <div className="mb-2 flex flex-col items-center">
          <img className='my-4' src={logo} width="50" alt="Magic Moments Logo" />
          <h1 className="mb-2 text-xl font-montserrat text-cyan-950 font-bold">Magic Moments</h1>
        </div>
        <form onSubmit={handleSubmit} id='form'>
          <label className='font-montserrat text-cyan-950 text-xs'>Email</label>
          <div className="mb-4 text-lg">
            <input

              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white bg-opacity-10 text-xs placeholder:italic placeholder:text-slate-400 block w-full border text-cyan-950 border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
              type="text"
              name="email"
            />
          </div>
          <label className='font-montserrat text-cyan-950 text-xs'>Password</label>
          <div className="mb-4 text-lg">
            <input
  
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block w-full border text-xs  border-slate-300 rounded-md py-2 pl-3 pr-3 text-cyan-950 shadow-sm focus:outline-none sm:text-sm"
              type="password"
              name="password"
            />
          </div>
          <div className="mt-8 flex justify-center text-lg text-black">
            <button
              type="submit"
              className="rounded-3xl bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-sm text-white shadow-xl backdrop-blur-md transition-colors  transform hover:scale-105 hover:transition ease-out duration-300 font-montserrat"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default AdminLogin