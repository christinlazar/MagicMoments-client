import React, { useEffect, useState } from 'react'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'
import { cancelBookingRequest, fetchBookingDetials, fetchBookingRequests } from '../../api/userApi'
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
    const [bookingsReqs,setBookingReqs] = useState<bookingInt[] | null>([])
    const[reload,setReload] = useState<boolean>(false)
    useEffect(()=>{
        const fetchBookingData = async () =>{
        const response =  await fetchBookingRequests()
        console.log("bkngsssss is",response?.data.bookingReqs)
        if(response?.data.bookingReqs){
            setBookingReqs(response.data.bookingReqs)
        }
        }
        fetchBookingData()
    },[reload])

    const cancelRequest = async(bookingID:string)=>{
        const response = await cancelBookingRequest(bookingID)
        console.log(response)
        if(response?.data.success){
            toast.success("Your booking request has been cancelled")
            setTimeout(()=>{
            setReload(true)
            },2000)
        }
    }
  return (
    <div className="flex px-12">
        <Toaster richColors position="bottom-right" />
            <div className='mt-20 hidden md:block'>
                <SideBar/>
            </div>
            <div className="overflow-x-auto mt-5 pt-20 px-6 w-full">
      <Toaster richColors position='bottom-right' />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             Request_To
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
              Cancel 
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookingsReqs && bookingsReqs.map((req:any) => (
            <tr key={req._id} >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="">
                    <div className="text-sm font-medium text-gray-900 font-montserrat">{req.vendorId.companyName}</div>
                    {/* <div className="text-sm text-gray-500">Email</div> */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
               
                    // ):
                    // (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                       {req.bookingStatus}
                      </span>  
                    // )
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-20">{req.noOfDays}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ps-10">{req.startingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-montserrat text-gray-500">
          
              {/* <button
                    // onClick={() => acceptRequest(rq._id as string)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  > */}
                    {req.vendorId.companyName}
                {/* </button> */}
              </td>
              <td>
              <button
                    onClick={() => cancelRequest(req._id as string)}
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

export default BookingRequests