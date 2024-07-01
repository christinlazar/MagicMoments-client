import React,{useState,useEffect,useRef} from 'react'
import {toast,Toaster} from 'sonner'
import {useLocation ,Link} from 'react-router-dom'
import logo from '../../assets/license (1).png'
import VendorVerifyOTPmodal from '../../components/vendor/vendorOtp'
import RegisterImage from '../../assets/pexels-jin-wedding-3859587-5729156.jpg'
import { vendorSignup } from '../../api/vendorApi'
// import { select } from '@material-tailwind/react'
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

  const BuisnessCategory = ['wedding photography','Wedding planner']
  const places = [
     "Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Chandigarh", "Bhopal", "Indore", "Nagpur", "Vadodara", "Surat", "Patna", "Kanpur", "Ludhiana", "Agra", "Amritsar", "Visakhapatnam", "Coimbatore", "Thiruvananthapuram", "Guwahati", "Madurai", "Nashik", "Jodhpur", "Ranchi", "Raipur",
    "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal", "Telangana", "Gujarat", "Rajasthan", "Uttar Pradesh", "Punjab", "Madhya Pradesh", "Andhra Pradesh", "Kerala", "Assam", "Jharkhand", "Chhattisgarh"

]
   

  useEffect(()=>{
  const {state} = location
     if (state) {
      console.log("state is",state)
      setIsModalOpen(false);
      if (formRef.current) {
        formRef.current.style.display = 'block';
      }
    }
  },[location])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    console.log("get inside this")
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
        console.log("-",companyName,companyEmail,password,category,)
        setName("")
        setEmail("")
        setPassword("")
        setCategory("")
        setPlace("")
        if(companyName.trim() !== '' && companyEmail.trim() !== '' && password.trim() !== '' && place.trim() && category.trim()){
        const result = await vendorSignup(companyName,companyEmail,password,place,category)
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
     
        {/* <ToastContainer  className ='Toastify__toast-container--top-right'/> */}
        <Toaster richColors position="bottom-right" />
        <div  style={{display:'block'}} className="rounded-xl bg-white bg-opacity-20 m-20 my-12 px-16 py-30 shadow-lg backdrop-blur-[2px] max-sm:px-4" ref={formRef}>
        <div className="text-white" >
          <div className="mb-2 flex flex-col items-center">
            <img className='my-4' src={logo} width="50" alt="Magic moments Logo"/>
            <h1 className="mb-2 text-2xl">Vendor signup</h1>
          </div>
          <form  onSubmit={handleSubmit} id='form' >
            <label className='font-serif'>Company Name</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError1}  value={companyName} onChange={(e)=>setName(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="name"  />
              
                <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error1}</small>

            </div>
            <label className='font-serif'>Company email</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError2} value={companyEmail} onChange={(e)=>setEmail(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="text" name="email"  />
              <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error2}</small>
            </div>
            <label className='font-serif'>Category</label>
            <div className="mb-4 text-lg">
              {/* <input onBlur={showError4} value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="password" name="password" />
              <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error4}</small> */}
             
                <select onChange={(e)=>setCategory(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" >
                    <option value='' className='font-serif bg-zinc-800' aria-readonly>select category</option>
                    {
                    BuisnessCategory.map((cat)=>(
                    <option className='font-serif bg-zinc-800'  value={cat}>{cat}</option>          
                    ))
                    }
                </select>

          
            </div>
            <label className='font-serif'>Company location</label>
            
            <select onChange={(e)=>setPlace(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" >
                    <option value='' className='font-serif bg-zinc-800' aria-readonly >Select Location</option>
                    {
                    places.map((place)=>(
                    <option className='font-serif bg-zinc-800'   value={place}>{place}</option>          
                    ))
                    }
                </select>
            <label className='font-serif'>Password</label>
            <div className="mb-4 text-lg">
              <input onBlur={showError4} value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-white bg-opacity-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm" type="password" name="password" />
              <small className='text-red-600 font-serif  backdrop-blur-[2px]'>{error4}</small>
            </div>
            <div className="mt-8 flex-col justify-center text-lg text-black">
              <button type="submit" className="rounded-3xl bg-red-600 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 transform hover:scale-105 hover:transition ease-out duration-300 font-serif">sign up</button>
            <Link to='/vendor/vendorLogin' className='mt-3 ms-2 text-slate-500 font-serif text-sm hover:text-red-500'>Login</Link>  
            </div>
          </form>
        </div>
      </div>

      {
            isModalOpen && (
              <VendorVerifyOTPmodal />
            )
          }
    </div>
  )
}

export default VendorSignup