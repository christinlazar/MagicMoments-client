import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'sonner'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { fetchBookings } from '../../api/vendorApi'
import useListenMessages from '../../hooks/useListenMessages'

function EventBookings() {
  useListenMessages()
    const [bookings,setBookings] = useState([])

    useEffect(()=>{
        async function fetchbookings(){
            const response = await fetchBookings()
            console.log(response)
            if(response?.data.bookings){
                console.log(response.data.bookings)
                setBookings(response.data.bookings)
            }
        }
        fetchbookings()
    },[])

  return (
    <div className="flex ps-12">
      <Toaster richColors position="bottom-right"/>
      <div className=' mt-5 hidden md:block'>
      <VendorSidebar/>
      </div>
      <div className="overflow-x-auto pt-20 w-full">
      <Toaster richColors position='bottom-right' />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             Client_Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payment Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Starting Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             No of event days
            </th>
             <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount Received
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reject
            </th>  */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings && bookings.map((booking:any) => (
            <tr >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{booking?.clientName}</div>
                    {/* <div className="text-sm text-gray-500">Email</div> */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                    // booking?.paymentStatus == "requested" ? (
                    //     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                    //     {booking?.paymentStatus}
                    //   </span> 
                    // ): booking?.paymentStatus == "accepted" ?(
                    //     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    //     {booking?.paymentStatus}
                    //   </span> 
                    // ):
                    // (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {booking?.paymentStatus}
                      </span>  
                    // )
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking?.startingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-20">{booking?.noOfDays}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className='font-montserrat font-semibold text-cyan-950'>Rs.{booking.amountPaid}</span>
              </td>
              {/* <td>
              <button
                    // onClick={() => rejectRequest(booking._id as string)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Reject
                </button>
              </td> */}
            </tr>
           ))} 
        </tbody>
      </table>
    </div>
      </div>
  )
}

export default EventBookings