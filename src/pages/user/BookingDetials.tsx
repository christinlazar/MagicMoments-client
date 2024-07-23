import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'
import { fetchBookingDetials } from '../../api/userApi'
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Booking_id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             Payment-status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Toatl No of Days
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             Starting_date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Company_Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount_paid
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Cancel 
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings && bookings.map((booking:any) => (
            <tr >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="">
                    <div className="text-sm font-medium text-gray-900 font-montserrat">{booking._id}</div>
                    {/* <div className="text-sm text-gray-500">Email</div> */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
               
                    // ):
                    // (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                       {booking.paymentStatus}
                      </span>  
                    // )
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-20">{booking.noOfDays}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-10">{booking.startingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">
          
              {/* <button
                    // onClick={() => acceptRequest(rq._id as string)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  > */}
                    {booking.vendorId.companyName}
                {/* </button> */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">
          
           
                    {booking.amountPaid}
             
              </td>
              <td>
              <button
                    // onClick={() => rejectRequest(rq._id as string)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Cancel
                </button>
              </td>
            </tr>
             ))}  
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default BookingDetials