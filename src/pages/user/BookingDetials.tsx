import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'
import { fetchBookingDetials } from '../../api/userApi'
import useListenMessages from '../../hooks/useListenMessages';
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
    useEffect(()=>{
        const fetchBookingData = async () =>{
        const response =  await fetchBookingDetials()
        console.log("bkngs is",response?.data.bookings)
        if(response?.data.bookings){
            setBookings(response.data.bookings)
        }
        }
        fetchBookingData()
    },[])

    const bookingPerPage = 10
    const lastBooking = currentPage * bookingPerPage
    const firstBooking = lastBooking - bookingPerPage
    const currBookings = bookings?.slice(firstBooking,lastBooking)

    const handlePageChange = (pageNumber:number) =>{
        console.log(pageNumber)
        console.log("gggg",Math.floor(bookings.length/bookingPerPage))
        if(pageNumber > Math.ceil(bookings.length/bookingPerPage)){
          console.log("inthisss")
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
  return (
    <div className="flex ps-12">
    <Toaster richColors position="bottom-right" />
    <div className='mt-20 hidden md:block'>
        <SideBar />
    </div>
    <div className="overflow-x-auto mt-5 pt-20 w-full">
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
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currBookings && currBookings.map((booking:any,index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-montserrat">{booking._id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {booking.paymentStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.noOfDays}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.startingDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">{booking.vendorId.companyName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">Rs.{booking.amountPaid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Responsive Layout */}
            <div className="md:hidden me-6 shadow-md shadow-slate-800 rounded-lg">
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
                            {/* <div className="mt-4 mb-10">
                                <button className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700">
                                    Cancel
                                </button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            {
                bookings.length > 0 && (
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
</div>

  )
}

export default BookingDetials