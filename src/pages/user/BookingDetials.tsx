import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'
import { cancelBooking, fetchBookingDetials, searchCompany, sortbyDate } from '../../api/userApi'
import useListenMessages from '../../hooks/useListenMessages';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { createPortal } from 'react-dom';
export enum PaymentStatus {
    Pending = 'pending',
    Completed = 'completed'
}

interface bookingInt extends Document{
    _id?:string;
    vendorId:string,
    userId:string,
    clientName:string,
    startingDate:string,
    noOfDays:string,
    amountPaid?:string,
    paymentStatus:PaymentStatus
}

function BookingDetials() {
  useListenMessages()
    const [bookings,setBookings] = useState<bookingInt[] >([])
    const [pageRange,setPageRange] = useState<number[]>([1,2,3])
    const [currentPage,setCurrentpage] = useState<number>(1)
    const [companyName,setCompanyName] = useState<string>('')
    const [startDate,setStartDate] = useState<string>('')
    const [endDate,setEndDate] = useState<string>('')
    const [refresh,setRefresh] = useState(false)
    const [isUploading,setIsUploading] = useState<boolean>(false)
    const [isOverlayVisible,setIsOverlayVisisble] = useState<boolean>(false)
    const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
    useEffect(()=>{
        const fetchBookingData = async () =>{
        const response =  await fetchBookingDetials()
        if(response?.data.bookings){
            setBookings(response.data.bookings)
        }
        }
        fetchBookingData()
        return () =>{
            setRefresh(false)
        }
    },[refresh])

    const bookingPerPage = 2
    const lastBooking = currentPage * bookingPerPage
    const firstBooking = lastBooking - bookingPerPage
    const currBookings = bookings?.slice(firstBooking,lastBooking)

    const handlePageChange = (pageNumber:number) =>{
        if(pageNumber > Math.ceil(bookings.length/bookingPerPage)){
          return
        }
        setCurrentpage(pageNumber)
        if(pageNumber > pageRange[0] && pageNumber < bookings.length){
          setPageRange([pageRange[0]+1,pageRange[1]+1,pageRange[2]+1])

        }
        if(pageNumber < pageRange[0] && pageNumber > 0){
          setPageRange([pageRange[0]-1,pageRange[1]-1,pageRange[2]-1])
   
        }
        else{
          return 
        }
    }

    const handleCompanySearch = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const response = await searchCompany(companyName)
        if(response?.data.bookings.length > 0 ){
                setBookings(response?.data.bookings)
        }else{
            return toast.error("No such booking exists")
        }
      
    }

    const handleDateSort = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const response = await sortbyDate(startDate,endDate)
        if(response?.data.bookings){
            setBookings(response.data.bookings)
        }
    }

    const handleCancelBooking = async (bookingId:string) => {
        setIsUploading(true)
        setIsOverlayVisisble(true)
        const response = await cancelBooking(bookingId)
       
        if(response?.data.cancelled){
            setRefresh(true)
            setIsUploading(false)
            setIsOverlayVisisble(false)
            toast.success("Booking has been cancelled successfully")
        }
    }

  return (
<div className="flex flex-col md:flex-row ps-4 md:ps-0">
    <Toaster richColors position="bottom-right" />
        <div className='mt-10 md:mt-20 hidden md:block'>
            <SideBar />
        </div>
    {isOverlayVisible && (
        <div className="absolute inset-0 bg-white opacity-80 z-20"></div>
      )}
    <div className="overflow-x-auto mt-5 pt-10 md:pt-20 w-full">
        <div className='flex flex-col md:flex-row justify-between pe-4 md:pe-10'>
            <div className='mb-4 md:mb-0'>
                <form onSubmit={handleCompanySearch}>
                    <div className='flex flex-col md:flex-row items-center h-24'>
                        <div className='flex flex-col pb-4 md:pb-10'>
                            <label className='text-sm font-bold text-cyan-950 pb-2'>Company name</label> 
                            <input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} type='text' placeholder='search the company' className='h-8 w-full md:w-56 focus:outline-none rounded-xl font-montserrat text-start ps-2 text-xs border border-gray-500'/>
                        </div>
                        <button type='submit' className='md:ms-4'>
                            <i className="fi fi-rr-search text-2xl text-cyan-950 hover:cursor-pointer"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className=''>
                <form onSubmit={handleDateSort}>
                    <div className='flex flex-col md:flex-row mb-4 md:mb-10 ms-0 md:ms-10'>
                        <div className='flex flex-col items-center justify-center mb-4 md:mb-0'>
                            <label className='text-sm font-bold font-montserrat p-2 text-cyan-950'>Start Date</label>
                            <input onChange={(e)=>setStartDate(e.target.value)} value={startDate} type='date' className='border rounded-full text-center text-xs border-gray-400'/>
                        </div>
                        <div className='flex flex-col items-center justify-center md:ps-20'>
                            <label className='text-sm font-bold font-montserrat p-2 text-cyan-950'>End Date</label>
                            <input onChange={(e)=>setEndDate(e.target.value)} value={endDate} type='date' className='border rounded-full text-center text-xs border-gray-400'/>
                        </div>
                        <button type='submit' className='rounded-full h-8 md:w-24 font-montserrat bg-cyan-950 text-white text-xs mt-4  md:mt-9 md:ms-10'>Filter</button>
                    </div>
                </form>
            </div>
        </div>

        <div className='font-montserrat font-bold text-cyan-800 ps-4 pb-4'>Booking Details</div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total No of Days</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel Booking</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currBookings && currBookings.map((booking:any,index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-montserrat">{booking?.bookingId.split('-')[0]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {booking.paymentStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.noOfDays}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.startingDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">{booking.vendorId.companyName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">Rs.{booking.amountPaid}</td>
                            <td>
                            <span
                            onClick={()=>handleCancelBooking(booking._id)}
                                className="rounded bg-cyan-950 px-6 py-2 mt-2 hover:cursor-pointer text-xs text-white shadow transition duration-150 ease-in-out hover:bg-cyan-950 focus:bg-cyan-950 focus:outline-none active:bg-cyan-950"
                            >
                                Cancel
                            </span>
                            </td>
                         
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Responsive Layout */}
            <div className="md:hidden me-4 shadow-md shadow-slate-800 rounded-lg">
                {currBookings && currBookings.map((booking:any, index) => (
                    <div key={index} className="border border-gray-200 rounded-md mb-4 p-4">
                        <div className="flex flex-col p-2">
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Booking ID:</span>
                                <span className="text-gray-700 text-xs ms-2">{booking._id}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Payment Status:</span>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 ms-5">{booking.paymentStatus}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Total No of Days:</span>
                                <span className="text-gray-700 ms-5">{booking.noOfDays}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Starting Date:</span>
                                <span className="text-gray-700 ms-5">{booking.startingDate}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Company Name:</span>
                                <span className="text-gray-700 ms-5">{booking.vendorId.companyName}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Amount Paid:</span>
                                <span className="text-gray-700 ms-5">Rs.{booking.amountPaid}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-bold w-32">Cancel</span>
                                <button
                                 onClick={()=>handleCancelBooking(booking._id)}
                                className="rounded bg-cyan-950 px-6 py-2 mt-2 text-xs text-white shadow transition duration-150 ease-in-out hover:bg-cyan-950 focus:bg-cyan-950 focus:outline-none active:bg-cyan-950"
                            >
                                Cancel
                            </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
               bookings && bookings.length > 0 && (
                    <div className="flex justify-center p-10 flex-wrap space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mx-1 h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border font-montserrat rounded-md text-white hover:cursor-pointer bg-cyan-950 hover:bg-cyan-950"
                    >
                        Previous
                    </button>

                    {pageRange.map((page) => (
                        <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border rounded-full ${page === currentPage ? 'bg-cyan-950 text-white' : 'bg-white hover:bg-gray-100'} text-gray-600`}
                        >
                        {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(bookings?.length / bookingPerPage)}
                        className="mx-1 h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border rounded-md text-white bg-cyan-950 hover:bg-cyan-950"
                    >
                        Next
                    </button>
                    </div>
                )
            }
                       
        </div>
        
    </div>
    {isUploading && userInfo !== null && createPortal(
          <div className='flex items-center justify-center z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5' style={{ color: 'black', borderRadius: '5px' }}>
            <div className="loader">
              <span className="loader-text text-2xl">cancelling..</span>
              <span className="load"></span>
            </div>
          </div>,
          document.body
        )}
</div>

  )
}

export default BookingDetials