
import React, { useState ,useRef, useEffect} from 'react'
import { Toaster, toast } from 'sonner'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/pexels-imagestudio-1488312.jpg'
import { sendForgotMail } from '../../api/userApi'
import ForgotPasswordOtp from './ForgotPasswordOtp'
import { useLocation } from 'react-router-dom'
function UserForgotPassword() {
  const [email,setEmail] = useState<string>('')
  const[query,setquery] = useState('')
  const location = useLocation()

  useEffect(()=>{
    setquery(location.search)
  })
  
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const formRef = useRef<HTMLDivElement>(null)
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        try {
            e.preventDefault()
            const res = await sendForgotMail(email)
            if(res?.data.success){
                setIsModalOpen(true)
                if(formRef.current){
                    formRef.current.style.display = 'none'
                }
            }
        } catch (error:any) {
          console.error(error)

        }
    }
  return (
    
<div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
  {
    query && (
      <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" ref={formRef} >
      <div className="text-white" >
        <div className=" flex flex-col items-center">
          <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
          <h1 className=" font-montserrat text-cyan-950 text-xl font-bold">Magic Moments</h1>
        </div>
        <form  onSubmit={handleSubmit} id='form' className='p-6' >
          <label className='font-montserrat text-sm text-gray-100'>Enter the email</label>
          <div className="mb-4 text-lg">
            <input  value={email} onChange={(e)=>setEmail(e.target.value)}  className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block  w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="email"  />
          </div>
          <div className="mt-8 flex justify-center text-lg text-black">
                  <button type="submit" className="rounded-3xl  bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors  text-xs  transform hover:scale-105 hover:transition ease-out duration-300 font-montserrat">send mail</button>
                </div>
        </form>
      </div>
    </div>
    )
  }
    {
     isModalOpen && query && (
        <ForgotPasswordOtp/>
     )   
    }
  <Toaster richColors position="bottom-right" />

</div>
  )
}

export default UserForgotPassword