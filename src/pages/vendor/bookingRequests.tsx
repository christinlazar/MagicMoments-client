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
    const dispatch = useDispatch()
    useEffect(()=>{
        async function fetchBookingReqData(){
            const response = await fetchBookingRequests()
            setBookingDetails(response?.data.bookingData)
        }
        fetchBookingReqData()
    },[acceptReq])
    console.log("bk details",bookingDetails)
    const acceptRequest = async (bookingId:string) =>{
        const result = await acceptBookingRequest(bookingId)
        console.log("req is",result)
        if(result?.data.success){
            toast.success("request has been accepted")
            setAcceptReq(true)
        }
    }

    const rejectRequest = async (bookingId:string) =>{

    }

  return (
    <div className="flex ps-12">
    <div className=' mt-5 hidden md:block'>
    <VendorSidebar />
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
              Request From
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Request Status
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
              Accept
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reject
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookingDetails && bookingDetails.map((rq:any) => (
            <tr >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{rq?.userName}</div>
                    {/* <div className="text-sm text-gray-500">Email</div> */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                    rq?.bookingStatus == "requested" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        {rq?.bookingStatus}
                      </span> 
                    ): rq?.bookingStatus == "accepted" ?(
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {rq?.bookingStatus}
                      </span> 
                    ):
                    (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {rq?.bookingStatus}
                      </span>  
                    )
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq?.startingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-20">{rq?.noOfDays}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          
              <button
                    onClick={() => acceptRequest(rq._id as string)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Accept
                </button>
              </td>
              <td>
              <button
                    onClick={() => rejectRequest(rq._id as string)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Reject
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

export default BookingRequests