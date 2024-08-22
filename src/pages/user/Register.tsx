import React, { useState,useRef, useEffect } from 'react'
import RegisterImage from '../../assets/pexels-bethany-ferr-5184415.jpg'
import logo from '../../assets/wedding (2).png'
import { useLocation } from 'react-router-dom'
import { signup } from '../../api/userApi';
import VerifyOTPmodal from '../../components/VerifyOTPmodal';
// import {ToastContainer,toast} from 'react-toastify'
import {Toaster,toast} from 'sonner'
import 'react-toastify/dist/ReactToastify.css'
import GoogleAuthSignup from '../../components/user/GoogleAuthSignup';
const  Register:React.FC = () => {

  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [phone,setPhone] = useState<number>(0)
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
      setIsModalOpen(false); 
      if (formRef.current) {
        formRef.current.style.display = 'block';
      }
    }
  },[location])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
      try {
        const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!name.trim() && !emailRegex.test(email) && !password.trim() && !confirmPassword.trim()){
          toast.error("Please fill all fields")
          return 
        }else if(!emailRegex.test(email)){
          toast.error("Email pattern is not correct")
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
        }else if(JSON.stringify(phone).length !== 10){
          return toast.error("phone number must have 10 numbers")
        }else if(typeof(phone)!= 'number'){
          return toast.error('Phone number must be number type')
        }

        setName("")
        setEmail("")
        setPhone(0)
        setConfrimPassword("")
        setPassword("")
        if(name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && JSON.stringify(phone).trim() !== '' && JSON.stringify(phone).length == 10){
          const result = await signup(name,email,phone,password,confirmPassword);
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
          e.preventDefault()
          toast.error('fields cant be empty')
        }   
      } catch (error:any) {
        console.error(error)
      }
  }
  const showError1 = () =>{
      if(!name.trim()){
        toast.error("Name can't be empty")
      }
  }
  const showError2 = () =>{
    if(!email.trim()){
      toast.error("Email can't be empty")
    }
}
 const showError3 = () =>{
  if(!JSON.stringify(phone).trim()){
    toast.error("phone number  can't be empty")
  }
}
 const showError4 = () =>{
  if(!password.trim()){
    toast.error("Password can't be empty")
  }
}
const showError5 = () =>{
  if(!confirmPassword.trim()){
    toast.error(`Confirm password can't be empty`)
  }
}
  return (
   
    <div className="flex scrollbar-none h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat mt-10 p-6 sm:p-20" style={{ backgroundImage: `url(${RegisterImage})` }}>
  {isModalOpen && (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-0"></div>
  )}
  <Toaster richColors position="bottom-right" />
  
  <div className="rounded-xl bg-white bg-opacity-20 m-4 px-6 mt-8 shadow-lg backdrop-blur-[2px] max-w-md w-full" ref={formRef}>
    <div className="text-white">
      <div className="mb-2 flex flex-col items-center">
        <img className='my-4' src={logo} width="50" alt="Magic Moments Logo" />
        <h1 className="mb-2 text-xl font-serif font-bold text-cyan-950">Magic Moments</h1>
      </div>
      <div className='mb-5'>
      <GoogleAuthSignup userlogin={false} user={true}/>
      </div>

      
      <form onSubmit={handleSubmit} id='form'>
        <label className='font-serif text-cyan-950'>First Name</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError1}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white font-montserrat  bg-opacity-10 placeholder:italic text-xs text-cyan-950 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="text"
            name="name"
          />
          {/* <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error1}</small> */}
        </div>

        <label className='font-serif text-cyan-950'>Email</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError2}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white font-montserrat  bg-opacity-10 text-xs placeholder:italic text-cyan-950 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="text"
            name="email"
          />
          {/* <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error2}</small> */}
        </div>

        <label className='font-serif text-cyan-950'>Phone</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError3}
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
            className="bg-white font-montserrat  text-xs bg-opacity-10 placeholder:italic text-cyan-950 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="text"
            name="phone"
          />
          {/* <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error3}</small> */}
        </div>

        <label className='font-serif text-cyan-950'>Password</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white font-montserrat  text-xs bg-opacity-10 placeholder:italic text-cyan-950 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="password"
            name="password"
          />
          {/* <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error4}</small> */}
        </div>

        <label className='font-serif text-cyan-950'>Confirm your Password</label>
        <div className="mb-4 text-lg">
          <input
            onBlur={showError5}
            value={confirmPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
            className="bg-white text-xs font-montserrat bg-opacity-10 placeholder:italic text-cyan-950 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            type="password"
            name="confirmPassword"
          />
          {/* <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error5}</small> */}
        </div>
       
        

        <div className="mt-8 flex justify-center text-lg text-black">
          <button type="submit" className="rounded-3xl w-full bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">Signup</button>
        </div>

      </form>
    </div>
    <div>
</div>
  </div>
  {isModalOpen && <VerifyOTPmodal />}
</div>

  )
}

export default Register