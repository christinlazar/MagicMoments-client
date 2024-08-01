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
    const [bookings,setBookings] = useState<bookingInt[] | null>([])
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
  return (
    <div className="flex ps-12">
        <Toaster richColors position="bottom-right" />
            <div className='mt-20 hidden md:block'>
                <SideBar/>
            </div>
            <div className="overflow-x-auto mt-5 pt-20 w-full">
      <Toaster richColors position='bottom-right' />
      <div className='font-montserrat font-bold text-cyan-800 p-4'>Booking Detials</div>
  <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 hidden md:table">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking_id</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment-status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total No of Days</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting_date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company_Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount_paid</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {bookings && bookings.map((booking:any, index) => (
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
          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">{booking.amountPaid}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700">
              Cancel
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Responsive Layout */}
  <div className="md:hidden me-6 shadow-md shadow-slate-800 rounded-lg ">
    {bookings && bookings.map((booking:any, index) => (
      <div key={index} className="border border-gray-200 rounded-md mb-4 p-4">
        <div className="flex flex-col p-2">
          <div className="flex items-center mb-2 ">
            <span className="font-bold w-32">Booking_id:</span>
            <span className="text-gray-700 text-xs ms-2">{booking._id}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Payment-status:</span>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 ms-5">{booking.paymentStatus}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Total No of Days:</span>
            <span className="text-gray-700 ms-5">{booking.noOfDays}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Starting_date:</span>
            <span className="text-gray-700 ms-5">{booking.startingDate}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Company_Name:</span>
            <span className="text-gray-700 ms-5">{booking.vendorId.companyName}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Amount_paid:</span>
            <span className="text-gray-700 ms-5">{booking.amountPaid}</span>
          </div>
          <div className="mt-4 mb-10">
            <button className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
    </div>
  )
}

export default BookingDetials