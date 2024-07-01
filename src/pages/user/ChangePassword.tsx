
import React, { useEffect, useState } from 'react'
import logo from '../../assets/license (1).png'
import RegisterImage from '../../assets/pexels-imagestudio-1488312.jpg'
import { Toaster,toast } from 'sonner'
import { changePassword } from '../../api/userApi'
import { useLocation, useNavigate } from 'react-router-dom'
function ChangePassword() {
  const [show,setShow] = useState<boolean>(false)
  const location = useLocation()
  console.log(location.state)
  useEffect(()=>{
    if(location.state.show){
        setShow(true)
    }
  },[location])
  const navigate = useNavigate()
    const [newPassword,setNewPassword] = useState<string>('')
    const [newPasswordConfirm,setNewPasswordConfirm] = useState<string>('')
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      try {
        e.preventDefault()
        if(newPassword !== newPasswordConfirm){
          return toast.error('Passwords must be matching')
        }else if(newPassword.length < 6 || newPasswordConfirm.length < 6){
          return toast.error("passowrd  must contain 6 charateristics")
        }else{
          const res = await changePassword(newPassword,newPasswordConfirm)
          console.log(res)
          if(res?.data.success){
            navigate('/login')
          }
        }
      } catch (error) {
        
      }
    }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
            <Toaster richColors position="bottom-right" />
      {
          show && (

            <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" >
            <div className="text-white" >
              <div className=" flex flex-col items-center">
                <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
                <h1 className=" text-2xl">Magic Moments</h1>
              </div>
              <form  onSubmit={handleSubmit} id='form' className='p-6' >
                <label className='font-serif'>Enter new Password</label>
                <div className="mb-4 text-lg">
                  <input type='password'  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm"  name="newPassword"  />
                </div>
                <label className='font-serif'>Confirm the password</label>
                <div className="mb-4 text-lg">
                  <input type='password'  value={newPasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)}  className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm"  name="newPasswordConfirm"  />
                </div>
                <div className="mt-8 flex justify-center text-lg text-black">
                        <button type="submit" className="rounded-3xl bg-red-600 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">Confirm</button>
                      </div>
              </form>
            </div>
          </div>
          )
      }
</div>
  )
}

export default ChangePassword