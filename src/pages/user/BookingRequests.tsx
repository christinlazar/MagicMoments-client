import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'
import { cancelBookingRequest, fetchBookingDetials, fetchBookingRequests } from '../../api/userApi'
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

function BookingRequests() {
  useListenMessages()
    const [bookingsReqs,setBookingReqs] = useState<bookingInt[] >([])
    const[reload,setReload] = useState<boolean>(false)
    const [pageRange,setPageRange] = useState<number[]>([1,2,3])
    const [currentPage,setCurrentpage] = useState<number>(1)
    useEffect(()=>{
        const fetchBookingData = async () =>{
        const response =  await fetchBookingRequests()
        if(response?.data.bookingReqs){
            setBookingReqs(response.data.bookingReqs)
        }
        }
        fetchBookingData()

        return ()=>{
          setReload(false)
        }
    },[reload])

    const cancelRequest = async(bookingID:string)=>{
        const response = await cancelBookingRequest(bookingID)
        if(response?.data.success){
            toast.success("Your booking request has been cancelled")
            setReload(true)
        }
    }

    const reqPerPage = 10
    const indexOfLastReq = currentPage * reqPerPage
    const indexOfFirstReq = indexOfLastReq-reqPerPage
    const currRequests = bookingsReqs?.slice(indexOfFirstReq,indexOfLastReq)

    const handlePageChange = (pageNumber:number)=>{
      if(pageNumber > Math.ceil(bookingsReqs.length/reqPerPage)){
        return
      }
      setCurrentpage(pageNumber)
      if(pageNumber > pageRange[0] && pageNumber < bookingsReqs.length){
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
    <div className="flex">
        <Toaster richColors position="bottom-right" />
            <div className='mt-20 hidden md:block'>
                <SideBar/>
            </div>
            <div className="overflow-x-auto mt-5 pt-20 ps-6 w-screen">
      <Toaster richColors position='bottom-right' />
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 hidden md:table">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request_To</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total No of Days</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting_date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company_Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {currRequests && currRequests.map((req:any, index) => (
        <tr key={req._id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-900 font-montserrat">{req.vendorId.companyName}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {req.bookingStatus}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-20">{req.noOfDays}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-10">{req.startingDate}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">{req.vendorId.companyName}</td>
          <td>
            <button
              onClick={() => cancelRequest(req._id)}
              className="rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs   text-white shadow transition duration-150 ease-in-out hover:bg-cyan-950 focus:bg-cyan-950 focus:outline-none active:bg-cyan-950"
            >
              Cancel
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Responsive Layout */}
  <div className="p-4 md:hidden">
    <div>
      <h1 className='font-montserrat text-xl font-bold pb-6'>Booking Requests</h1>
    </div>
    {currRequests && currRequests.map((req:any, index) => (
      <div key={index} className=" w-full  rounded-md mb-4 ">
        <div className="flex flex-col w-auto">
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Request_To:</span>
            <span className="text-gray-700 ms-6">{req.vendorId.companyName}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Request Status:</span>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 ms-6">{req.bookingStatus}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Total No of Days:</span>
            <span className="text-gray-700 ms-6">{req.noOfDays}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Starting_date:</span>
            <span className="text-gray-700 ms-6">{req.startingDate}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold w-32">Company_Name:</span>
            <span className="text-gray-700 ms-6">{req.vendorId.companyName}</span>
          </div>
          <div className="mt-4">
            <button
              onClick={() => cancelRequest(req._id)}
              className="rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs   text-white shadow transition duration-150 ease-in-out hover:bg-cyan-950 focus:bg-cyan-950 focus:outline-none active:bg-cyan-950"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  {
    bookingsReqs.length > 0 && (
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
          disabled={currentPage === Math.ceil(bookingsReqs?.length / reqPerPage)}
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

export default BookingRequests