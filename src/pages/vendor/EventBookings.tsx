import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { fetchBookings } from '../../api/vendorApi'
import useListenMessages from '../../hooks/useListenMessages'

function EventBookings() {
  useListenMessages()
    const [bookings,setBookings] = useState([])
    const [currentPage,setCurrentpage]  = useState<number>(1)
    const [pageRange,setPageRange] =  useState<number[]>([1,2,3])

    useEffect(()=>{
        async function fetchbookings(){
            const response = await fetchBookings()
        
            if(response?.data.bookings){
            
                setBookings(response.data.bookings)
            }
        }
        fetchbookings()
    },[])

    const eventsPerPage = 1
    const lastIndexOfreqs = currentPage * eventsPerPage
    const firstIndexOfreqs = lastIndexOfreqs-eventsPerPage
    const currEvents = bookings?.slice(firstIndexOfreqs,lastIndexOfreqs)

    const handlePageChange = (pageNumber:number) =>{
    
      if(pageNumber > Math.ceil(bookings.length/eventsPerPage)){

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
    <div className="flex flex-col md:flex-row ps-4 md:ps-12">
  <Toaster richColors position="bottom-right" />
  <div className='mt-5 hidden md:block'>
    <VendorSidebar />
  </div>
  <div className="overflow-x-auto pt-20 w-full">
    <Toaster richColors position='bottom-right' />

    <div className="block md:hidden">
        <div className=''>
          <h1 className='ms-4 text-xl font-bold font-montserrat pe-6 pb-6 pt-6'>Booking Requests</h1>
        </div>
      {currEvents && currEvents.map((booking:any) => (
        <div key={booking._id} className=" border-gray-200 p-4">
          <div className="flex justify-between">
            <span className="font-semibold">Client Name:</span>
            <span>{booking?.clientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Status:</span>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {booking?.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Starting Date:</span>
            <span>{booking?.startingDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">No of Event Days:</span>
            <span>{booking?.noOfDays}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Amount Received:</span>
            <span className='font-montserrat font-semibold text-cyan-950'>Rs.{booking.amountPaid}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Original Table for Medium and Large Screens */}

    <table className="min-w-full divide-y divide-gray-200 hidden md:table">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Client Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Payment Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Starting Date
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            No of Event Days
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount Received
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {currEvents && currEvents.map((booking:any) => (
          <tr key={booking._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{booking?.clientName}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {booking?.paymentStatus}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking?.startingDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking?.noOfDays}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className='font-montserrat font-semibold text-cyan-950'>Rs.{booking?.amountPaid}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
              disabled={currentPage === Math.ceil(bookings?.length / eventsPerPage)}
              className="mx-1 h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border rounded-md text-white bg-cyan-950 hover:bg-cyan-950"
          >
              Next
          </button>
          </div>
        )
      }
  </div>
</div>

  )
}

export default EventBookings