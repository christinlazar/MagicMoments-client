import React, { useEffect ,useState } from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { Toaster,toast } from 'sonner'
import { acceptBookingRequest, fetchBookingRequests } from '../../api/vendorApi'
import { useDispatch,  } from 'react-redux'
import useListenMessages from '../../hooks/useListenMessages'

function BookingRequests() {
  useListenMessages()
    const [bookingDetails,setBookingDetails] = useState<string[]>([])
    const [acceptReq,setAcceptReq] = useState<boolean>(false)
    const [pageRange,setPageRange] = useState<number[]>([1,2,3])
    const [currentPage,setCurrentpage] = useState<number>(1)
    const dispatch = useDispatch()
    useEffect(()=>{
        async function fetchBookingReqData(){
            const response = await fetchBookingRequests()
            setBookingDetails(response?.data.bookingData)
        }
        fetchBookingReqData()
    },[acceptReq])
  
    const acceptRequest = async (bookingId:string) =>{
        const result = await acceptBookingRequest(bookingId)
   
        if(result?.data.success){
            toast.success("request has been accepted")
            setAcceptReq(true)
        }
    }

    const rejectRequest = async (bookingId:string) =>{

    }

    const reqPerPage = 2
    const lastIndexOfreqs = currentPage * reqPerPage
    const firstIndexOfreqs = lastIndexOfreqs-reqPerPage
    const currReqs = bookingDetails?.slice(firstIndexOfreqs,lastIndexOfreqs)

    const handlePageChange = (pageNumber:number) =>{
    
      
      if(pageNumber > Math.ceil(bookingDetails.length/reqPerPage)){
       
        return
      }
      setCurrentpage(pageNumber)
      if(pageNumber > pageRange[0] && pageNumber < bookingDetails.length){
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
    <div className='mt-5 hidden md:block'>
      <VendorSidebar />
    </div>
    <div className="overflow-x-auto pt-10 w-full">
      <Toaster richColors position='bottom-right' />
      
      {/* Responsive Table */}
      <div className="block md:hidden">
        <div>
          <h1 className='ms-4 text-xl font-bold font-montserrat pe-6 pb-6 pt-0'>Booking Requests</h1>
        </div>
        {currReqs && currReqs.map((rq:any) => (
          <div key={rq._id} className="border-b border-gray-200 p-4">
            <div className="flex justify-between">
              <span className="font-semibold">Request From:</span>
              <span>{rq?.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Request Status:</span>
              <span>
                {rq?.bookingStatus === "requested" ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                    {rq?.bookingStatus}
                  </span>
                ) : rq?.bookingStatus === "accepted" ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {rq?.bookingStatus}
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {rq?.bookingStatus}
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Starting Date:</span>
              <span>{rq?.startingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">No of event days:</span>
              <span>{rq?.noOfDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Actions:</span>
              <div>
                <button
                  onClick={() => acceptRequest(rq._id)}
                  className="inline-block rounded bg-primary px-2 pb-1 pt-1 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700 mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectRequest(rq._id)}
                  className="inline-block rounded bg-primary px-2 pb-1 pt-1 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* Original Table */}
      <div>
          <h1 className='ms-2 text-xl font-bold font-montserrat pe-6 pb-6 pt-6'>Booking Requests</h1>
        </div>
      <table className="min-w-full divide-y  divide-gray-200 hidden md:table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request From</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of event days</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accept</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reject</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currReqs && currReqs.map((rq:any) => (
            <tr key={rq._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{rq?.userName}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {rq?.bookingStatus === "requested" ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                    {rq?.bookingStatus}
                  </span>
                ) : rq?.bookingStatus === "accepted" ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {rq?.bookingStatus}
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {rq?.bookingStatus}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq?.startingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq?.noOfDays}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => acceptRequest(rq._id)}
                  className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                >
                  Accept
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => rejectRequest(rq._id)}
                  className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out focus:outline-none"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        bookingDetails.length > 0 && (
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
              disabled={currentPage === Math.ceil(bookingDetails?.length / reqPerPage)}
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

export default BookingRequests