
import React,{useState,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster,toast } from 'sonner'
import { verifyForgotOtp } from '../../api/userApi'
function ForgotPasswordOtp() {
    const [modalOn,setModal] = useState<boolean>(true)
    const [otp,setOtp] = useState<string>('')
    // const [timeLeft,setTimeLeft] = useState<number>(60)
    const[resend,setResend] = useState<boolean>(false)
    const navigate = useNavigate()
    // const resendBtnRef = useRef<HTMLButtonElement>(null)
    // const sendBtnRef = useRef<HTMLButtonElement>(null)

    // useEffect(() => {
    //   if (timeLeft <= 0){
    //     if(resendBtnRef.current && sendBtnRef.current){
    //         resendBtnRef.current.style.display = 'block'
    //         sendBtnRef.current.style.display = 'none'
    //     }
    //     return;
    //   } 
    //   const timerId = setTimeout(() => {
    //     setTimeLeft(timeLeft - 1);
    //   }, 1000);
  
    //   // Clean up the timer when the component unmounts or timeLeft changes
    //   return () => clearTimeout(timerId);
    // }, [timeLeft,resend]);

    function closeModal(){
        setModal(false)
        navigate('/login',{state:{toLogin:true}})
    }
    async function sendOtp(e:React.FormEvent<HTMLFormElement>){
      try {
        console.log("getting in sendOtp")
        e.preventDefault()
        const res = await verifyForgotOtp(otp)
        if(res?.data.success){
            navigate('/changePassword',{state:{show:true}})
        }
      } catch (error:Error | any) {
        console.log(error)
      }
    }
    // const resendOtp = async () =>{
    //   const res = await ResendOtp()
    //   if(res?.data.success){
    //     toast.success("otp sended successully")
    //       setResend(true)
    //       setTimeLeft(60)
    //       if(resendBtnRef.current && sendBtnRef.current){
    //         resendBtnRef.current.style.display = 'none'
    //         sendBtnRef.current.style.display = 'block'
    //     }
    //   }
    // }
  return (
    <>
    {
        modalOn && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
          <Toaster/>
            <div 
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-10 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden inset-0"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
                  Sign in to our platform
                </h3>
               
                <button
                 onClick={closeModal} 
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
               
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form method='post' className="space-y-4" onSubmit={sendOtp} >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter the OTP
                    </label>
                    <input
                      value={otp}
                      type="text"
                      name="otp"
                      id="otp"
                      onChange={(e)=>setOtp(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter The OTP"
                    />
                  </div>
                  <div>
                    {/* <small> Time remaing:{timeLeft}</small> */}
                </div>
                  <button type='submit' style={{display:'block'}} className="w-full text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    confirm
                  </button>
                </form>
                {/* <button onClick={resendOtp} style={{display:'none'}} ref={resendBtnRef} className="w-full text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> */}
                    {/* Resend otp */}
                {/* </button> */}
              </div>
            </div>
          </div>
        </div>
        </div>
        )
    }
</>
  )
}

export default ForgotPasswordOtp