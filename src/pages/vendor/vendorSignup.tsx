import React,{useState,useEffect,useRef} from 'react'
import {toast,Toaster} from 'sonner'
import {useLocation ,Link} from 'react-router-dom'
import logo from '../../assets/wedding (2).png'
import VendorVerifyOTPmodal from '../../components/vendor/vendorOtp'
import RegisterImage from '../../assets/pexels-summerstock-300957.jpg'
import { vendorSignup } from '../../api/vendorApi'
function VendorSignup() {
    
  const [companyName,setName] = useState<string>("")
  const [companyEmail,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [category,setCategory] = useState<string>("")
  const [place,setPlace] = useState<string>("")
  const [error1,setError1] = useState("")
  const [error2,setError2] = useState("")
  const [error4,setError4] = useState("")
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const formRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const BuisnessCategory = ['wedding photography']
  const places = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
]

   

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
        if(!companyName.trim() && !emailRegex.test(companyEmail) && !password.trim()){
          toast.error("Please fill all fields")
          return 
        }
      else if(password.trim().length < 6){
          toast.error("password must contain more than 6 letters")
          return 
        }
        setName("")
        setEmail("")
        setPassword("")
        setCategory("")
        setPlace("")
        if(companyName.trim() !== '' && companyEmail.trim() !== '' && password.trim() !== '' && place.trim() && category.trim()){
        const result = await vendorSignup(companyName,companyEmail,password,place,category)
       
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
          return toast.error('fields cant be empty')
        }   
      } catch (error:any) {
        console.error(error)

      }
  }
  const showError1 = () =>{
      if(!companyName.trim()){
        toast.error("Name can't be empty")
      }
  }
  const showError2 = () =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!companyEmail.trim()){
      toast.error("Email can't be empty")
    }else if(!emailRegex.test(companyEmail)){
        toast.error('Email format is not correct')
    }

}
 const showError4 = () =>{
  if(!password.trim()){
    toast.error("Password can't be empty")
  }
}

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
    {isModalOpen && (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-0"></div>
    )}
    <Toaster richColors position="bottom-right" />
    <div className="rounded-xl shadow-md bg-white bg-opacity-20 mx-4 my-12 px-8 py-10 shadow-lg backdrop-blur-[2px] max-w-md w-full" ref={formRef}>
      <div className="text-white">
        <div className="mb-2 flex flex-col items-center">
          <img className='my-4' src={logo} width="50" alt="Magic Moments Logo" />
          <h1 className="mb-2 text-xl font-montserrat text-cyan-950 ">Vendor Signup</h1>
        </div>
        <form onSubmit={handleSubmit} id='form'>
          <label className='font-montserrat text-cyan-950 text-sm'>Company Name</label>
          <div className="mb-4 text-lg">
            <input
              onBlur={showError1}
              value={companyName}
              onChange={(e) => setName(e.target.value)}
              className=" bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
              type="text"
              name="name"
            />
            <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error1}</small>
          </div>
          
          <label className='font-montserrat text-cyan-950 text-sm'>Company Email</label>
          <div className="mb-4 text-lg">
            <input
              onBlur={showError2}
              value={companyEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
              type="email"
              name="email"
            />
            <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error2}</small>
          </div>
          
          <label className='font-montserrat text-cyan-950 text-sm'>Category</label>
          <div className="mb-4 text-lg">
            <select onChange={(e) => setCategory(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm">
              <option value='' className='font-serif bg-zinc-800' aria-readonly>Select Category</option>
              {BuisnessCategory.map((cat) => (
                <option className='font-serif bg-zinc-800' value={cat} key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <label className='font-montserrat text-cyan-950 text-sm'>Company Location</label>
          <select onChange={(e) => setPlace(e.target.value)} className=" bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm">
            <option value='' className='font-montserrat text-xs  bg-zinc-800' aria-readonly>Select Location</option>
            {places.map((place) => (
              <option className='font-serif bg-zinc-800' value={place} key={place}>{place}</option>
            ))}
          </select>
  
          <label className='font-montserrat text-cyan-950 text-sm '>Password</label>
          <div className="mb-4 text-lg">
            <input
              onBlur={showError4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
              type="password"
              name="password"
            />
            <small className='text-red-600 font-serif backdrop-blur-[2px]'>{error4}</small>
          </div>
          
          <div className="mt-8 flex-col justify-center text-lg text-black">
            <button type="submit" className="rounded-3xl bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors  transform hover:scale-105 hover:transition ease-out duration-300 font-montserrat text-sm">Sign Up</button>
            <Link to='/vendor/vendorLogin' className='mt-3 ms-2 text-cyan-950 font-montserrat text-sm hover:text-cyan-950'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  
    {isModalOpen && (
      <VendorVerifyOTPmodal />
    )}
  </div>
  
  )
}

export default VendorSignup