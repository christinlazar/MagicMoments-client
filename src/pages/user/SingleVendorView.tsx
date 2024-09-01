
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { bringThatVendor, editReview, getReviews, getUserData, getVendorChat, isExistingBookingRequest, SendBookingRequest, submitReview, wishlist } from '../../api/userApi'
import { createPortal } from 'react-dom'
import { handleStripePayment,checkIsReqAccepted } from '../../api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import { GoogleMap,Marker,LoadScript,MarkerF } from '@react-google-maps/api'
import useListenMessages from '../../hooks/useListenMessages'
//@ts-ignore
import Calendar from 'react-calendar'
import { setWishListDisplayfalse, setWishListDisplayTrue } from '../../store/slice/AuthSlice'
 enum AcceptanceStatus {
  Requested = 'requested',
  Accepted = 'accepted',
  Rejected = 'rejected'
}
interface Vendor{
  _id:string;
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

interface Review{
  _id:string,
  vendorId:string,
  userId:string,
  review:string,
  rating:number
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

interface pos{
  lat:number,
  lng:number
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
    const [locations,setLocations] = useState<any>([])
    const [review,setReview]= useState<string>('')
    const [rating, setRating] = useState<number | null | any>(3);
    const [reviewData,setReviewData] = useState<Review[] | null>([])
    const [reviewRefresh,setReviewRefresh] = useState<boolean>(false)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [unAvailableDates,setUnavailableDates] = useState<string[]>([])
    const [editModal,setEditModal] = useState<boolean>(false)
    const [reviewValue,setReviewvalue] = useState<string>('')
    const [editingReviewId,setEditingReviewId] = useState<string>('')
    const [userID,setUserID] = useState('')
    const dispatch = useDispatch()

    const userData = useSelector((state:RootState)=>state.auth.userInfo)

    useEffect(()=>{
      const bringVendorDetial = async () =>{
          const response = await bringThatVendor(userId)
          if(response?.data.data){
            setVendorDetail(response?.data?.data)
            setUnavailableDates(response?.data.data.unAvailableDates)
            setLocations(response.data.data.locations)
            getreviews(response?.data?.data?._id)
          }
      }
      bringVendorDetial()   
      setIsScriptLoaded(true)
     
return ()=>{
  setIsScriptLoaded(false) 
  dispatch(setWishListDisplayfalse())
  setReviewRefresh(false)

}
    },[modalOpen,openBooking,reviewRefresh])


    useEffect(()=>{
      async function getuser(){
      const response = await getUserData()
      setUserID(response?.data?.user._id)
      }
      getuser()
      return ()=>{
  setReviewRefresh(false)
      }
    },[])

    const unavailableDatesFormatted = unAvailableDates.map(date => {
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; 
    });
  

    const tileClassName = ({ date }: { date: Date }) => {
      const dateString = date.toISOString().split('T')[0]; 
      return unavailableDatesFormatted.includes(dateString) ? 'unavailable' : 'available';
    };
    
    
    const getreviews = async (vendorId:string) =>{
      const response = await getReviews(vendorId)
      if(response?.data){
        setReviewData(response.data.reviews)
      }
    }


    
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
          const bookingData  = response?.data.result
          if(response?.data.success && bookingData.bookingStatus == "accepted"){
            let vendorId = vendorDetail?._id
            let amount = vendorDetail?.startingPrice
            let companyName = vendorDetail?.companyName
            const resposne = await handleStripePayment(companyName,vendorId,amount,bookingData)
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
        
      } catch (error:any) {
        console.error(error)

      }
    }
    const closeBookingModal = () =>{
      setDate('')
      setNoOfDays('')
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

        if(noOfDays == "0"){
          return toast.error("Please add no of days")
        }
        if(parseInt(noOfDays) <0){
          return toast.error("No of days cant be a negative number")
        }

        const bookingData = {
          date:date,
          noOfDays,
          vendorId:vendorDetail?._id
        }
        const sendBookingRequestResponse = await SendBookingRequest(bookingData)
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

    const mapStyles = {
      height: "50vh",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)"
    };
    const defaultCenter = {
      lat:locations[0]?.location?.coordinates[0],
      lng:locations[0]?.location?.coordinates[1]
   }
   const defaultCenter2 = {
    lat:0,
    lng:0
   }

   const handleReviewSubmit =  async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      if(review.trim() == ''){
        return toast.error("Review cant be empty")
      }
      const response = await submitReview(review,rating,vendorDetail?._id)
      setReview('')
      setRating(3)
      if(response?.data.isAllowed == false){
        toast.error("Cant add review,you haven't collabrated with this service provider")
      }
      if(response?.data.success){
        setReviewRefresh(true)
        toast.success('Review submitted successfully')
      }
   }

   const handleWishlist = async ()=>{
    const response = await wishlist(vendorDetail?._id)
    if(!userData){
      return toast.error("Please login to add  a vendor to wishlist")
    }
    if(response?.data.success){
      dispatch(setWishListDisplayTrue())
      toast.success("added to wishlist")
    }else{
      toast.error("Already exists in the wishlist")
    }
    }

    const handleMarkerClick = async (pos:pos)=>{
      let lat = pos.lat
      let lng = pos.lng
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      window.open(googleMapsUrl,'_blank')
    }

    const setEditReviewModal =   (reviewId:string)=>{
      setEditingReviewId(reviewId)
      const reviewToShow:any =  reviewData?.filter((rev:any)=>rev?._id == reviewId)
      setReviewvalue(reviewToShow[0].review)
      setIsOverlayVisisble(true)
      setEditModal(true)
    }

    const closeReviewModal = () =>{
      setIsOverlayVisisble(false)
      setEditingReviewId('')
      setEditModal(false)
    }

    const submitEditedReview = async () =>{
            if(reviewValue.trim() == ''){
              return toast.error("review cant be empty")
            }
        const response = await editReview(reviewValue,editingReviewId)
        if(response?.data.success){
          setReviewRefresh(true)
            toast.success("Review edited successfully")
            setIsOverlayVisisble(false)
            setEditModal(false)
        }
    } 
    

  return (
    <>   
    <div className='border border-gray-300 opacity-60 '></div>
    {isOverlayVisible && (
          <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
        )}
    <div className='h-5/6 flex mt-32' ref={modalRef}>
    <Toaster richColors position='bottom-right'/>
      <div className='w-screen overflow-x-hidden xl:w-1/2 xl:mx-20 scrollbar-none'>
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
          <h1 className='font-semibold font-montserrat text-md text-cyan-950 ms-7 md:ms-16'>Dates on which we have been booked</h1>
          <div className=' w-96 p-4 mt-5 md:ms-10'>
          <Calendar 
                tileClassName={tileClassName}
              />
          </div>
          <div className='md:ps-16 pb-10 '>
            <div className='font-montserrat text-2xl font-bold p-6'>
            <span>Location</span>
            </div>
            {
              isScriptLoaded && (                  
                    locations.length > 0 ? (
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={6}
                center={defaultCenter}  
            >
                {
                
                  locations.map((loc:any,index:number)=>{
                    let pos = {
                      lat:loc.location?.coordinates[0],
                      lng:loc.location?.coordinates[1],
                    }
                    return  (
                      <MarkerF onClick={()=>handleMarkerClick(pos)} key={index} position={pos}  />
                    )
                  }  
                )
                }
            </GoogleMap>
                    ):(
                      <div>
                             <span className='text-sm font-montserrat font-bold mb-4'>Location have'nt been added yet!</span>
                      <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter2}  
            >
            </GoogleMap>
                      </div>
                   
                    )
              )
            }
          </div>

          <div className=' px-2 md:ps-16 pb-10 '>
            <div className='font-montserrat text-2xl font-bold p-1 '>
            <span>Reviews</span>
            </div>
           
             <span className='text-sm text-cyan-950 font-montserrat ms-1 '>
            If you've got the service,share your thoughts with other customers
            </span>
            <div className="flex items-center mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-xl cursor-pointer ${
            star <= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
          onClick={() => setRating(star)} 
        >
          ★
        </button>
      ))}
    </div>
            <form onSubmit={handleReviewSubmit}>
            <textarea onChange={(e)=>setReview(e.target.value)}  value={review} placeholder='Share your thoughts...' className='border me-5 w-full mt-5 shadow-xl text-xs font-montserrat ps-3 pt-5 focus:outline-none h-80'>

            </textarea>
            <div className='flex justify-center items-center md:justify-end'>
              <button type='submit' className='button mt-6 h-10 rounded-full text-sm'>
                submit
              </button>
            </div>
            </form>
            {
              reviewData && reviewData.map((rev:any)=>
                {
                 return  (
                    <article>
                    <div className="flex items-center mb-4">
                      <div className="font-medium dark:text-white">
                        <p className='text-sm'>
                        {rev.userId?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                      {[...Array(4)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < rev.rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400 bg-white">
                      <p className='text-sm mt-4'>
                      {`${new Date(rev.createdAt).getDate()}/${new Date(rev.createdAt).getMonth()}/${new Date(rev.createdAt).getFullYear()}`}
                      </p>
                    </footer>
                    <p className="mb-2 text-gray-500 font-montserrat text-sm dark:text-gray-400">
                     {rev.review}
                    </p>
                    
                    {
                      
                      rev?.userId._id == userID ? 
                       <div onClick={()=>setEditReviewModal(rev._id)} className='p-1 flex justify-end hover:cursor-pointer'>
                      <i className="fi fi-rr-edit"></i>
                        <span className='ms-2'>edit</span>
                      </div> : ''
    
                    }
                   
                </article>
                  )
                }
               
            )
            }
    
            </div>
        
         
    <div className='flex flex-col items-center xl:hidden '>
      
        <h1 className='font-montserrat text-xl text-cyan-800  my-4 font-bold'>{vendorDetail?.companyName}</h1>
        <div className='flex'>
          <i className="fi fi-rr-land-layer-location text-base"></i>
          <span className='text text-sm font-montserrat '>Location : </span>
          <span className='text text-sm font-montserrat '>{vendorDetail?.companyLocation}</span>
        </div>
        <div className='h-10 w-80 border rounded-lg shadow-md mt-4 ms-12 flex'>
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
         
       
   
          <h1 className='font-semibold font-montserrat p-4  text-cyan-800'>Our services</h1>
          <ul>
          {
          vendorDetail?.services && vendorDetail.services.map((service,index)=>(
            <li key={index} className='text-xs font-montserrat '>{service}</li>
          ))
          }
          </ul>
          <div className='flex flex-col justify-center md:flex-row md:justify-between  mb-10'>
  <div className='m-3 w-full md:w-auto'>
    <button onClick={() => handlePay(vendorDetail?._id)} className='button mt-6 h-10 rounded-full text-sm w-full md:w-auto'>
      <span>Pay now</span>
    </button>
  </div>
  <div className='m-3 w-full md:w-auto'>
    <button onClick={() => bookNow(vendorDetail?._id)} className='button mt-6 h-10 rounded-full text-sm w-full md:w-auto'>
      <span>Book now</span>
    </button>
  </div>
  <div className='m-3 w-full md:w-auto'>
    <button onClick={handleChatClick} className='button mt-6 h-10 rounded-full text-sm w-full md:w-auto'>
      <span>Message</span>
    </button>
  </div>
  <div className='ms-3 mt-3 w-full flex  md:w-auto'>
  <i onClick={handleWishlist} className="fi fi-rr-circle-heart mt-1  text-xs font-montserrat hover:cursor-pointer"></i>
  <span className='font-montserrat text-xs ms-2'>Add to wishlist</span>
  </div>

</div>


        </div>

        {
          editModal && userInfo != null &&  createPortal(
            <div className='z-40 h-96 w-96 shadow-2xl border border-gray-500 border-opacity-50 rounded-xl overflow-y-auto ' style={{ color: 'black', backgroundColor: 'white', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <p className='font-montserrat font-bold text-xl text-center drop-shadow-2xl text-cyan-800 p-5'>Edit Review</p>
                <textarea onChange={(e)=>setReviewvalue(e.target.value)} value={reviewValue} className=' font-montserrat text-xs border border-gray-400 p-3 focus:outline-none w-full h-36'>

                </textarea>
                <div className='flex justify-around'>
                <button className='rounded-full text-xs  text-center w-20 h-10  mt-3 bg-cyan-950 bg-opacity-90 text-white'  onClick={()=>submitEditedReview()}>Submit</button>
                <button className='rounded-full text-xs  text-center w-20 h-10  mt-3 bg-cyan-950 bg-opacity-90 text-white'  onClick={()=>closeReviewModal()}>Close</button>
                </div>
                
          </div>,
          document.body
        )
        }
      
     
          
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
                <button className='rounded-full text-xs  text-center w-20 h-10 ms-36 mt-3 bg-cyan-950 bg-opacity-90 text-white'  onClick={closeModal}>Close</button>
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
         
          <i onClick={handleWishlist} className="fi fi-rr-circle-heart mt-7 ms-5 text-3xl hover:cursor-pointer"></i>
        
        </div>
      

        <div className=' p-2'>   
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