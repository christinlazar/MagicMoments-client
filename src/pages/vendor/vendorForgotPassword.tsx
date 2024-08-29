import React, { useState ,useRef, useEffect} from 'react'
import { Toaster, toast } from 'sonner'
import logo from '../../assets/wedding (2).png'
import RegisterImage from '../../assets/pexels-edwardeyer-14106978.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { sendForgotMailFromVendor, verifyForgetotp } from '../../api/vendorApi'


function VendorForgotPassword() {
  const [email,setEmail] = useState<string>('')
  const [otp,setOtp] = useState<string>('')
  const[query,setquery] = useState('')
  const location = useLocation()
  const [modalOpen,setModalOpen] = useState<boolean>(false)
  const [count,setCount] = useState(1)
  const navigate = useNavigate()
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    setquery(location.search)
  },[])


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        try {
           e.preventDefault()
           if(email.trim() == ''){
            return toast.error("Field can't be empty")
           }
            const response = await sendForgotMailFromVendor(email)
            if(response?.data.emailSend){
                setModalOpen(true)
                if(formRef.current){
                    formRef.current.style.display = "none"
                }
            }else{
              toast.error("Email is incorrect")
            }
        } catch (error:unknown) {
          console.error(error)
        }
    }

    const closeModal = () =>{
        setModalOpen(false)
        setEmail('')
        if(formRef.current){
            formRef.current.style.display = "block"
        }
    }
    const sendOtp = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const response = await verifyForgetotp(otp)
        console.log("response.data?",response?.data)
        if(response?.data.success){
        navigate('/vendor/changePassword',{state:{show:true}})
        }else if(response?.data.success == false){
             console.log(count)
             if(count == 3){
                toast.error("3 attempts failed,please go back and try again")
                setTimeout(()=>{
                    navigate('/vendor/vendorLogin')
                },3000)
             }else{
             toast.error("Entered otp is incorrect,please try again")
             }
             setCount(count+1)
        }
    }


  return (
    
<div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${RegisterImage})` }}>
<Toaster richColors position='bottom-right' />
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
                  <button  type="submit" className="rounded-3xl  bg-cyan-950 bg-opacity-100 px-10 py-2 mb-10 text-white shadow-xl backdrop-blur-md transition-colors  text-xs  transform hover:scale-105 hover:transition ease-out duration-300 font-montserrat">send mail</button>
          </div>
        </form>
      </div>
    </div>
    )
  }
  <Toaster richColors position="bottom-right" />
  {modalOpen  && createPortal(
            <div className='bg-white bg-opacity-20 z-40 h-96 w-96 shadow-2xl border backdrop-blur-[2px] border-gray-500 border-opacity-50 rounded-xl overflow-y-auto ' style={{ color: 'black', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <p className='font-montserrat font-bold text-xl text-center drop-shadow-2xl text-cyan-950 p-5'>Send Otp</p>
                  <div className='dates flex flex-col'>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={sendOtp} >
                          <div>
                            <label
                              htmlFor="otp"
                              className="block mb-2 text-xs font-montserrat  font-bold text-cyan-950 dark:text-white"
                            >
                              Enter the OTP
                            </label>
                            <input
                              value={otp}
                              type="text"
                              name="otp"
                              id="otp"
                              onChange={(e)=>setOtp(e.target.value)}
                              className="bg-transparent focus:outline-none placeholder:text-cyan-950 text-xs   rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="Enter The OTP"
                            />
                          </div>
                       
                          <button type='submit'  className="w-full font-montserrat  text-white bg-cyan-950 hover:bg-cyan-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Verify otp
                          </button>
                        </form>
                      </div>
                  </div>
                <button className='rounded-full  text-center w-20 h-10 ms-36 mt-3 bg-cyan-950 text-xs bg-opacity-90 text-white'  onClick={closeModal}>Close</button>
          </div>,
          document.body
        )}
         
  </div>
  )
}

export default VendorForgotPassword