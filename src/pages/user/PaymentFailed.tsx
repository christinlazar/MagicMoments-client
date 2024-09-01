
import { Link, useLocation } from 'react-router-dom'
import closeLogo from '../../assets/circle-xmark (1).png'
import { toast, Toaster } from 'sonner';
function PaymentFailed() {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const otherUserBooked = queryParams.get('otherUserBooked')
    if(otherUserBooked != null || otherUserBooked != undefined){
       
        toast.error("Somebody else has done the payment first")
    }

  return (
    
  <div className="bg-gray-900 h-screen flex justify-center items-center">
    <Toaster richColors position='bottom-right'/>
  <div className="bg-white p-6 w-96  md:mx-auto rounded-2xl">
    <div className="text-red-600 w-16 h-16 mx-auto my-6">
          {/* <i className="fi fi-rr-circle-xmark h-60"></i> */}
          <img src={closeLogo} alt="" />
    </div>
    <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center font-montserrat">Payment Rejected!</h3>
        <p className="text-gray-600 my-2 font-montserrat">Something went wrong.</p>
        <p className='font-montserrat'> Please try again!  </p>
        <div className="py-10 text-center ">
            <Link to='/' className="px-12 bg-cyan-950 hover:bg-cyan-950 hover:text-white  text-white font-montserrat py-3 ">
                GO BACK 
           </Link>
        </div>
    </div>
</div>
</div>
  )
}

export default PaymentFailed