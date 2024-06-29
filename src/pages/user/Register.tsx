import React, { useState,useRef, useEffect } from 'react'
import RegisterImage from '../../assets/pexels-bethany-ferr-5184415.jpg'
import logo from '../../assets/license (1).png'
import { useLocation } from 'react-router-dom'
import { signup } from '../../api/userApi';
import VerifyOTPmodal from '../../components/VerifyOTPmodal';
// import {ToastContainer,toast} from 'react-toastify'
import {Toaster,toast} from 'sonner'
import 'react-toastify/dist/ReactToastify.css'
const  Register:React.FC = () => {

  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [phone,setPhone] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const[confirmPassword,setConfrimPassword] = useState<string>("")
  const [error1,setError1] = useState("")
  const [error2,setError2] = useState("")
  const [error3,setError3] = useState("")
  const [error4,setError4] = useState("")
  const [error5,setError5] = useState("")
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const formRef = useRef<HTMLDivElement>(null)
  const location = useLocation()



  useEffect(()=>{
  const {state} = location
     if (state) {
      console.log("state is",state)
      setIsModalOpen(false); // Set modal open state based on location.state
      if (formRef.current) {
        formRef.current.style.display = 'block';
      }
    }
  },[location])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    console.log("get inside this")
    e.preventDefault();
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!name.trim() && !emailRegex.test(email) && !password.trim() && !confirmPassword.trim()){
          toast.error("Please fill all fields")
          return 
        }
      else if(password.trim().length < 6){
          toast.error("password must contain more than 6 letters")
          return 
        }else if(password.trim() != confirmPassword.trim()){
          toast.error("password seems incorrect")
        }
        else if(confirmPassword.trim().length < 6){
          toast.error("password must contain more than 6 letters")
          return
        }else if(phone.length !== 10){
          toast.error("phone number must have 10 numbers")
        }
        console.log("name","email","password",name,email,password)
        setName("")
        setEmail("")
        setPhone("")
        setConfrimPassword("")
        setPassword("")
        if(name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && phone.trim() !== '' && phone.length == 10){
          const result = await signup(name,email,phone,password,confirmPassword);
          console.log(result)
          if(result?.data.success){
            setIsModalOpen(true)
            if(formRef.current){
             formRef.current.style.display = 'none'
            }
          }else if(result?.data.message){
            if(!result.data.data){
              toast.error(result.data.message)
            }  
          }
        }else{
          toast.error('fields cant be empty')
        }   
      } catch (error) {
        console.log(error)
      }
  }
  const showError1 = () =>{
      if(!name.trim()){
        // setError1('Required!')
        // setTimeout(()=>{
        //     setError1('')
        // },2000)
        toast.error("Name can't be empty")
      }
  }
  const showError2 = () =>{
    if(!email.trim()){
      // setError2('Required!')
      // setTimeout(()=>{
      //     setError2('')
      // },2000)
      toast.error("Email can't be empty")
    }
}
 const showError3 = () =>{
  if(!phone.trim()){
    // setError3('Required!')
    // setTimeout(()=>{
    //     setError3('')
    // },2000)
    toast.error("phone number  can't be empty")
  }
//   }else if(typeof(phone) != 'number'){
//     toast.error("phone number must be number")
// }
}
 const showError4 = () =>{
  if(!password.trim()){
    // setError4('Required!')
    // setTimeout(()=>{
    //     setError4('')
    // },2000)
    toast.error("Password can't be empty")
  }
}
const showError5 = () =>{
  if(!confirmPassword.trim()){
    // setError5('Required!')
    // setTimeout(()=>{
    //     setError5('')
    // },2000)
    toast.error(`Confirm password can't be empty`)
  }
}
  return (
   
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-0"></div>
      )}
     
        {/* <ToastContainer  className ='Toastify__toast-container--top-right'/> */}
        <Toaster richColors position="bottom-right" />
        <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" ref={formRef}>
        <div className="text-white" >
          <div className="mb-2 flex flex-col items-center">
            <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
            <h1 className="mb-2 text-2xl">Magic Moments</h1>
          </div>
          <form  onSubmit={handleSubmit} id='form' >
            <label className='font-serif'>First Name</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError1}  value={name} onChange={(e)=>setName(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="name"  />
              
                <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error1}</small>

            </div>
            <label className='font-serif'>Email</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError2} value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="email"  />
              <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error2}</small>
            </div>
            <label className='font-serif'>Phone</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError3} value={phone} onChange={(e)=>setPhone(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="phone"  />
              <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error3}</small>
            </div>
            <label className='font-serif'>Password</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError4} value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="password" name="password" />
              <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error4}</small>
            </div>
            <label className='font-serif'>Confirm your Password</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError5} value={confirmPassword} onChange={(e)=>setConfrimPassword(e.target.value)} className= "bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="password" name="confirmPassword" />
              <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error5}</small>
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button type="submit" className="rounded-3xl bg-red-600 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">sign up</button>
            </div>
          </form>
        </div>
      </div>

      {
            isModalOpen && (
              <VerifyOTPmodal />
            )
          }
    </div>
  )
}

export default Register