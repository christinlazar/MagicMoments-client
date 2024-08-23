
import React,{useEffect,useState} from 'react'
import { Toaster,toast } from 'sonner'
import { useLocation } from 'react-router-dom'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setVendorCredentials } from '../../store/slice/AuthSlice'
import { vendorLogin } from '../../api/vendorApi'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/pexels-edwardeyer-14106978.jpg'
import LoadingComponent from '../../components/LoadingComponent'
function VendorLogin() {
    const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
      const {state} = location
      if(state){
        // toast.success("User registration has been completed successfully")
      }
      
      
    },[location])
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const handleSubmit  = async (e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

        try {
           const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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
          setIsLoading(true)
          const result = await vendorLogin(email,password)
          if(result?.data.message2){
            setIsLoading(false)
            toast.error(result?.data.message2)
          }
          if(result?.data.accepted  == false){
            console.log("came back here")
            setIsLoading(false)
                toast.error("The request has'nt been accepted yet")
          }else if(result?.data.passwordIncorrect){
                toast.error("Password is incorrect")
          }
          else if(result?.data.success == true){
            setIsLoading(false)
             dispatch(setVendorCredentials(result.data.accessToken))
             navigate('/vendor/vendorStore',{state:{success:true}})
          }
        } catch (error:any) {
          console.error(error.message)
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

    <>
    {
      isLoading ? (
        <LoadingComponent/>
      ):(
        <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
  <Toaster richColors position="bottom-right" />

  <div className="rounded-xl  bg-white bg-opacity-20 m-4 sm:m-10 md:m-20 my-12 px-6 sm:px-16 py-10 shadow-xl backdrop-blur-[2px] max-w-md w-full">
    <div className="text-white">
      <div className="mb-2 flex flex-col items-center">
        <img className='my-4' src={logo} width="50" alt="Magic Moments Logo" />
        <h1 className="mb-2 text-2xl text-cyan-950 font-bold font-montserrat">Magic Moments</h1>
      </div>
      <form onSubmit={handleSubmit} id='form'>
        <label className='font-montserrat text-cyan-950 font-bold'>Email</label>
        <div className="mb-4 text-lg">
          <input 
            onBlur={showError1} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}  
            className="bg-opacity-10 font-serif placeholder:text-cyan-950 block bg-white w-full border rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm" 
            type="text" 
            name="email" 
            placeholder="Enter your email" 
          />
        </div>
        <label className='font-montserrat text-cyan-950 font-bold'>Password</label>
        <div className="mb-4 text-lg">
          <input 
            onBlur={showError2} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className=" bg-opacity-10 font-montserrat placeholder:text-cyan-950 block bg-white w-full border rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm" 
            type="password" 
            name="password" 
            placeholder="Enter your password" 
          />
        </div>
        <div className="mt-8 flex flex-col items-center text-lg text-black">
          <button 
            type="submit" 
            className="rounded-3xl font-montserrat text-sm bg-cyan-950 bg-opacity-100 px-10 py-2 mb-4 text-white shadow-xl backdrop-blur-md transition-colors transform hover:scale-105 hover:transition ease-out duration-300 "
          >
            Signin
          </button>
          <Link to='/vendor' className='mt-2 text-gray-900 font-montserrat text-sm hover:text-cyan-950'>
            Register
          </Link>  
        </div>
      </form>
    </div>
  </div>
</div>
      )
    }
    
    </>
    

  )
}

export default VendorLogin