import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/pexels-edwardeyer-14106978.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { confirmChangingPassword } from '../../api/vendorApi'

function ChangeVendorPassword() {
    const [newPassword,setNewPassword] = useState<string>('')
    const [newPasswordConfirm,setNewPasswordConfirm] = useState<string>('')
    const [show,setShow] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        if(location?.state?.show){
            setShow(true)
        }
    },[])
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
       try {
       
          e.preventDefault()
          if(newPassword.trim() == '' && newPasswordConfirm.trim() == ''){
             return toast.error("fileds cant be empty")
          }
          else if(newPassword.trim() == '' || newPasswordConfirm.trim() == ''){
             return toast.error("password field can't be empty")
           }else{
            const response = await confirmChangingPassword(newPassword,newPasswordConfirm)
            if(response?.data.success){
              setNewPassword('')
              setNewPasswordConfirm('')
              toast.success("Password updated successfully")
              setTimeout(()=>{
                  navigate('/vendor/vendorLogin')
              },3000)
            }else{
              toast.error("You havent completed some of the steps to change password")
              setTimeout(()=>{
                  navigate('/vendor/vendorLogin')
              },3000)
            }
           }
        
       } catch (error:unknown) {
        console.error(error)
       }
    }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
            <Toaster richColors position="bottom-right" />
      {
          show && show != null ?(

            <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" >
            <div className="text-white" >
              <div className=" flex flex-col items-center">
                <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
                <h1 className=" text-xl font-montserrat text-cyan-950 font-bold">Magic Moments</h1>
              </div>
              <form  onSubmit={handleSubmit} id='form' className='p-6' >
                <label className='font-montserrat text-cyan-950 text-xs font-bold'>Enter new Password</label>
                <div className="mb-4 text-lg">
                  <input type='password'  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  className=" bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm"  name="newPassword"  />
                </div>
                <label className='font-montserrat text-cyan-950 text-xs font-bold'>Confirm the password</label>
                <div className="mb-4 text-lg">
                  <input type='password'  value={newPasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)}  className=" bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm"  name="newPasswordConfirm"  />
                </div>
                <div className="mt-8 flex justify-center text-lg text-black">
                        <button type="submit" className="rounded-3xl bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors  transform hover:scale-105 hover:transition ease-out duration-300 font-montserrat text-xs">Confirm</button>
                      </div>
              </form>
            </div>
          </div>
          ) : (
            <h1></h1>
          )
      }
</div>
  )
}

export default ChangeVendorPassword