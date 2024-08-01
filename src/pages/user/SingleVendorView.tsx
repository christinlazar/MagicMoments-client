
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import { bringThatVendor } from '../../api/vendorApi'
import { bringThatVendor, getVendorChat, isExistingBookingRequest, SendBookingRequest } from '../../api/userApi'
import { createPortal } from 'react-dom'
import { addUnavailableDates } from '../../api/vendorApi'
import { handleStripePayment,checkIsReqAccepted } from '../../api/userApi'
import {loadStripe} from '@stripe/stripe-js'
import { useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import useListenMessages from '../../hooks/useListenMessages'
 enum AcceptanceStatus {
  Requested = 'requested',
  Accepted = 'accepted',
  Rejected = 'rejected'
}
interface Vendor{
  _id?:string;
  companyName:string;
  companyEmail:string;
  companyLocation:string;
  password:string;
  createdAt:Date;
  category:string;
  isAccepted:AcceptanceStatus;
  photos:string[];
  videos:string[];
  description:string,
  phoneNumber:string,
  startingPrice:string,
  unAvailableDates:string[],
  services:string[],
  isBlocked:boolean;
}
export interface bookingDataInterface{
  date:string;
  noOfDays:string;
  vendorId:string | undefined;
}
interface RootState{
  auth:{
      userInfo:string
  }
}


function SingleVendorView() {
  useListenMessages()
    const location = useLocation()
    const userId = location.state
    const [vendorDetail,setVendorDetail] = useState<Vendor | null>()
    const [modalOpen,setModalOpen] = useState<boolean>(false)
    const [openBooking,setOpenBooking] = useState<boolean>(false)
    const [isOverlayVisible,setIsOverlayVisisble] = useState(false)
    const [date,setDate] = useState<string>('')
    const [noOfDays,setNoOfDays] = useState<string>('')
    const modalRef = useRef<any>(null)
    const navigate = useNavigate()
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    const [conversations,setConversations] = useState(false)
 
    console.log("userInfo is",userInfo)

    useEffect(()=>{
      const bringVendorDetial = async () =>{
          const response = await bringThatVendor(userId)
          if(response?.data.data){
            setVendorDetail(response?.data?.data)
          }
      }
      bringVendorDetial()
    },[modalOpen,openBooking])
    console.log(modalOpen)
    const setModal = () =>{
      setModalOpen(true)
      setIsOverlayVisisble(true)

    }
    const closeModal = () =>{
      setModalOpen(false)
      setIsOverlayVisisble(false)
    }

    const handlePay = async (vendorId:string | undefined) =>{
      try {
        if(userInfo != null){
          const response = await checkIsReqAccepted(vendorId)
          console.log(response)
          const bookingData  = response?.data.result
          console.log("booking Data",bookingData)
          if(response?.data.success && bookingData.bookingStatus == "accepted"){
            let vendorId = vendorDetail?._id
            let amount = vendorDetail?.startingPrice
            let companyName = vendorDetail?.companyName
            const resposne = await handleStripePayment(companyName,vendorId,amount,bookingData)
            console.log("response of payment is",resposne)
            if(resposne?.data.result.url){
              window.location.href = resposne?.data.result.url
            }
          }else if(response?.data.success && bookingData.bookingStatus == "requested"){
            toast.warning("your request haven't accepted yet.Please wait for the confirmation")
          }else{
            toast.error("You haven't send a booking request yet!.please send a booking request")
          }
        }else{
            navigate('/login')
        }
      } catch (error) {
        
      }
    }

    const bookNow = async (vendorId:string | undefined) =>{
      try {
        console.log("gonna book nowwwww")
        if(userInfo !== null){
        const response = await isExistingBookingRequest(vendorId)
          if(response?.data.success){
            setOpenBooking(true)
            setIsOverlayVisisble(true)
          }else{
          toast.error("already existing an Booking request for this vendor")
          }
        }else{
          navigate('/login')
        }
        
      } catch (error) {
        console.error(error)
      }
    }
    const closeBookingModal = () =>{
      setOpenBooking(false)
      setIsOverlayVisisble(false)
    }

    const handleBookingSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()


        const currentDate = new Date();
        const bookingDate = new Date(date);
        if (bookingDate < currentDate) {
            toast.error("You cannot book a slot in the past");
            setDate('');
            setNoOfDays('');
            return;
        }

        const bookingData = {
          date:date,
          noOfDays,
          vendorId:vendorDetail?._id
        }
        const sendBookingRequestResponse = await SendBookingRequest(bookingData)
        console.log(sendBookingRequestResponse)
        if(sendBookingRequestResponse?.data.reqSend == false){
           toast.error("The Slot has already been booked")
           setDate('')
           setNoOfDays('')
           setTimeout(()=>{
            setOpenBooking(false)
            setIsOverlayVisisble(false)
           },3000)
        }else{
          toast.success("your booking request has been send")
          setDate('')
          setNoOfDays('')
          setTimeout(()=>{
            setOpenBooking(false)
            setIsOverlayVisisble(false)
           },3000)
        }
    }

    const handleChatClick = async () =>{
      const getChat = async () =>{
        const resposne = await getVendorChat(vendorDetail?._id)
          navigate('/singleChat',{state:{conversations:resposne?.data.conversations,companyName:vendorDetail?.companyName,phoneNumber:vendorDetail?.phoneNumber,dp:vendorDetail?.photos[0],routeis:'/tosinglechat',vendorId:vendorDetail?._id}})
        }
        getChat()
    }
  return (
    <>
    <div className='border border-gray-300 opacity-60'></div>
    {isOverlayVisible && (
          <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
        )}
    <div className='h-5/6 flex mt-20' ref={modalRef}>
    <Toaster richColors position='bottom-right'/>
      <div className=' xl:w-1/2 xl:mx-20'>
        <div className='xl:grid grid-rows-6 grid-flow-col gap-1 xl:h-[75%] rounded-md'>
          <div className='border row-span-6 col-span-2 text-center'>
            <img className="h-full object-cover" src={vendorDetail?.photos[0]} alt="Vendor photo" />
          </div>
          <div className='border row-span-3 text-center overflow-hidden col-span-2'>
            <img className="w-full object-cover" src={vendorDetail?.photos[1]} alt="Vendor photo" />
          </div>
          <div className='border row-span-3 text-center col-span-3 overflow-hidden'>
            <img className="w-full object-cover aspect-[5/2.5]" src={vendorDetail?.photos[2]} alt="Vendor photo" />
          </div>
          <div className='border row-span-3 text-center'>
            <img className="h-full object-cover" src={vendorDetail?.photos[3]} alt="Vendor photo" />
          </div>
        </div>
        <div className='border border-gray-600 border-opacity-30 mt-10'></div>
        <div className=' mt-0 xl:mt-5 p-2'>
          <h1 className='font-montserrat font-bold ms-10'>About</h1>
          <div className='flex ms-10'>
            <i className="fi fi-rr-flag-alt mt-3"></i>
            <p className='text-sm ms-3 mt-3'>Part of Magic moments since 2024.</p>
          </div>
          <div>
          <p className='text-sm px-12 xl:text-base xl:px-10 font-bold  font-montserrat'>Let your wedding picture be epitome of perfection with {vendorDetail?.companyName}</p>

          </div>
          <p className='text-sm ms-10 mt-1 font-montserrat px-2 pb-6'>{vendorDetail?.description}</p>
        </div>
    <div className='flex flex-col items-center xl:hidden '>
      
        <h1 className='font-montserrat text-xl text-cyan-800  my-4 font-bold'>{vendorDetail?.companyName}</h1>
        <div className='flex'>
          <i className="fi fi-rr-land-layer-location text-base"></i>
          <span className='text text-sm font-montserrat '>Location : </span>
          <span className='text text-sm font-montserrat '>{vendorDetail?.companyLocation}</span>
        </div>
        <div className='h-10 w-80 border rounded-lg shadow-md mt-4 flex'>
          <i className="fi fi-rr-coins mt-2 px-2"></i>
          <span className='text-xs mt-3 ms-3'>1 Day wedding package starts from Rs {vendorDetail?.startingPrice}</span>
        </div>
        <div className='flex'>
        <span onClick={()=>navigate('/photos',{state:vendorDetail?._id})} className=' text-cyan-800 hover:cursor-pointer  mt-6 h-10   text-sm'>
            <span >Photos</span>
          </span>
         
          <span onClick={()=>navigate('/videos',{state:vendorDetail?._id})} className=' text-cyan-800 hover:cursor-pointer ms-3 mt-6 h-10  text-sm'>
            <span >Videos</span>
          </span>

        </div>
        </div>

        <div>
        <div className='xl:hidden flex flex-col items-center '>
          <h1 className='font-semibold font-montserrat text-xs text-cyan-800 ms-4'>Dates on which we have been booked</h1>
          <div className='mt-3'>
            <ul className='text-xs'>
              <li>{vendorDetail?.unAvailableDates[0]}</li>
              <li>{vendorDetail?.unAvailableDates[1]}</li>
              <div className='flex'>
                <li>{vendorDetail?.unAvailableDates[2]}</li>
                <li onClick={setModal} className='text-sm hover:cursor-pointer'>...more</li>
              </div>
            </ul>
          </div>
          <h1 className='font-semibold font-montserrat p-4  text-cyan-800'>Our services</h1>
          <ul>
          {
          vendorDetail?.services && vendorDetail.services.map((service)=>(
            <li className='text-xs font-montserrat '>{service}</li>
          ))
          }
          </ul>
        <div className='flex justify-around w-full mb-10'>
          <div className='ms-16'>
            <button onClick={()=>handlePay(vendorDetail?._id)} className='button  mt-6 h-10 rounded-full text-sm'>
               <span >Pay now</span>
            </button>
          </div>
          <div className='me-16'>
            <button onClick={()=>bookNow(vendorDetail?._id)} className='button   mt-6 h-10 rounded-full text-sm'>
            <span >Book now</span>
            </button>
          </div>
        </div> 


        </div>
     
          
        {modalOpen && userInfo !== null && createPortal(
            <div className='z-40 h-96 w-96 shadow-2xl border border-gray-500 border-opacity-50 rounded-xl overflow-y-auto ' style={{ color: 'black', backgroundColor: 'white', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <p className='font-montserrat font-bold text-xl text-center drop-shadow-2xl text-cyan-800 p-5'>Unavailable Dates</p>
                  <div className='dates flex flex-col'>
                      {
                        vendorDetail?.unAvailableDates.map((date)=>(
                          <span className='text-xs  mt-4 mx-4 rounded-sm shadow-lg w-auto font-semibold text-black'>{date}</span>
                        ))
                      }
                  </div>
                <button className='rounded-full text-xs  text-center w-20 h-10 ms-36 mt-3 bg-cyan-800 bg-opacity-90 text-white'  onClick={closeModal}>Close</button>
          </div>,
          document.body
        )}

          {
            openBooking && userInfo !== null && createPortal(
              <div className="z-40 border shadow-2xl border-black border-opacity-55 w-80 bg-white p-8 text-sm font-inherit text-black flex flex-col gap-5 box-border rounded-lg "  style={{ color: 'black', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
  <div className="text-center font-semibold text-lg flex justify-between">
    <span className='text-xl font-montserrat'>Add booking Details</span>
    <span onClick={closeBookingModal} className='text-xs hover:cursor-pointer text-gray-800'>Close</span>
  </div>

  <form onSubmit={handleBookingSubmit} className="flex flex-col">
  
    <div className="flex flex-col gap-0.5">
      <label htmlFor='date'>Event Date</label>
      <input onChange={(e)=>setDate(e.target.value)} type="date" id="date" name="date" value={date} placeholder="Enter your email" required className="w-full p-3.5 rounded-md font-inherit border border-gray-300 placeholder-opacity-50 focus:outline-none focus:border-blue-600"/>
    </div>
    <div className="flex flex-col gap-0.5">
      <label htmlFor=''>No of days</label>
      <input onChange={(e)=>setNoOfDays(e.target.value)} type="number" id="days" name="days" value={noOfDays} placeholder="Enter the no of days" required className="w-full p-3.5 rounded-md font-inherit border border-gray-300 placeholder-opacity-50 focus:outline-none focus:border-blue-600"/>
    </div>

    <button type="submit" className="flex justify-center items-center text-white bg-gray-900 w-full p-3.5 h-10 gap-2 mt-3 cursor-pointer rounded-md shadow-md active:scale-95 hover:bg-gray-800">
      confrim
    </button>
  </form>
</div>,
document.body

            )
          }

      </div>
      </div>
  <div className=' hidden xl:flex flex-col items-center fixed  right-[13%]'>
        <h1 className='font-montserrat text-xl text-cyan-800 mx-12 my-4 font-bold'>{vendorDetail?.companyName}</h1>
        <div className='flex '>
          <i className="fi fi-rr-land-layer-location text-base"></i>
          <span className='text text-sm font-montserrat ms-2'>Location : </span>
          <span className='text text-sm font-montserrat ms-1'>{vendorDetail?.companyLocation}</span>
        </div>
        <div className='h-10 w-80 border rounded-lg shadow-md mt-4 flex'>
          <i className="fi fi-rr-coins mt-2 mx-2"></i>
          <span className='text-xs mt-3 mx-2'>1 Day wedding package starts from Rs {vendorDetail?.startingPrice}</span>
        </div>
        <div className='flex'>
        <span onClick={()=>navigate('/photos',{state:vendorDetail?._id})} className=' text-cyan-800 hover:cursor-pointer ms-3 mt-6 h-10  text-sm'>
            <span >Photos</span>
          </span>
         
          <span onClick={()=>navigate('/videos',{state:vendorDetail?._id})} className=' text-cyan-800 hover:cursor-pointer ms-3 mt-6 h-10 text-sm'>
            <span >Videos</span>
          </span>
        </div>
        <div className='flex pb-4'>
        <button onClick={()=>handlePay(vendorDetail?._id)} className='button mt-6 h-10 rounded-full text-sm'>
               <span >Pay now</span>
            </button>
        

          <button onClick={()=>bookNow(vendorDetail?._id)} className='button ms-3 mt-6 h-10 rounded-full text-sm'>
            <span >Book now</span>
          </button>

          <button onClick={handleChatClick} className='button ms-3 mt-6 h-10 rounded-full text-sm'>
            <span >Message</span>
          </button>
        </div>
      

        <div className=' p-2'>
          <h1 className='font-semibold font-montserrat text-cyan-800 mx'>Dates on which we have been booked</h1>
          <div className='mt-3 p-2'>
            <ul className='text-xs'>
              <li>{vendorDetail?.unAvailableDates[0]}</li>
              <li>{vendorDetail?.unAvailableDates[1]}</li>
              <div className='flex'>
                <li>{vendorDetail?.unAvailableDates[2]}</li>
                <li onClick={setModal} className='text-sm hover:cursor-pointer'>...more</li>
              </div>
            </ul>
          </div>
          
          <h1 className='font-semibold font-montserrat pe-2 pt-2 pb-2 text-cyan-800'>Our services</h1>
          <ul>
          {
          vendorDetail?.services && vendorDetail.services.map((service)=>(
            <li className='text-xs font-montserrat pe-1 pt-1 pb-1'>{service}</li>
          ))
          }
          </ul>
                
      


        </div>
        <div className='flex justify-start items-start'>
        
        </div>
        {modalOpen && userInfo !== null && createPortal(
            <div className='z-40 h-96 w-96 shadow-2xl border border-gray-500 border-opacity-50 rounded-xl overflow-y-auto ' style={{ color: 'black', backgroundColor: 'white', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <p className='font-montserrat font-bold text-xl text-center drop-shadow-2xl text-cyan-800 p-5'>Unavailable Dates</p>
                  <div className='dates flex flex-col'>
                      {
                        vendorDetail?.unAvailableDates.map((date)=>(
                          <span className='text-xs  mt-4 mx-4 rounded-sm shadow-lg w-auto font-semibold text-black'>{date}</span>
                        ))
                      }
                  </div>
                <button className='rounded-full text-xs  text-center w-20 h-10 ms-36 mt-3 bg-cyan-800 bg-opacity-90 text-white'  onClick={closeModal}>Close</button>
          </div>,
          document.body
        )}

          {
            openBooking && userInfo !== null && createPortal(
              <div className="z-40 border shadow-2xl border-black border-opacity-55 w-80 bg-white p-8 text-sm font-inherit text-black flex flex-col gap-5 box-border rounded-lg "  style={{ color: 'black', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
  <div className="text-center font-semibold text-lg flex justify-between">
    <span className='text-xl font-montserrat'>Add booking Details</span>
    <span onClick={closeBookingModal} className='text-xs hover:cursor-pointer text-gray-800'>Close</span>
  </div>

  <form onSubmit={handleBookingSubmit} className="flex flex-col">
  
    <div className="flex flex-col gap-0.5">
      <label htmlFor='date'>Event Date</label>
      <input onChange={(e)=>setDate(e.target.value)} type="date" id="date" name="date" value={date} placeholder="Enter your email" required className="w-full p-3.5 rounded-md font-inherit border border-gray-300 placeholder-opacity-50 focus:outline-none focus:border-blue-600"/>
    </div>
    <div className="flex flex-col gap-0.5">
      <label htmlFor=''>No of days</label>
      <input onChange={(e)=>setNoOfDays(e.target.value)} type="number" id="days" name="days" value={noOfDays} placeholder="Enter the no of days" required className="w-full p-3.5 rounded-md font-inherit border border-gray-300 placeholder-opacity-50 focus:outline-none focus:border-blue-600"/>
    </div>

    <button type="submit" className="flex justify-center items-center text-white bg-gray-900 w-full p-3.5 h-10 gap-2 mt-3 cursor-pointer rounded-md shadow-md active:scale-95 hover:bg-gray-800">
      confrim
    </button>
  </form>
</div>,
document.body

            )
          }

      </div>
    </div>
  </>
  )
}

export default SingleVendorView