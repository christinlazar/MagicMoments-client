import React,{useEffect,useState} from 'react'
import { Toaster,toast } from 'sonner'
import { bringVendors ,blockVendor,unblockVendor,acceptVendorReq,rejectVendorReq} from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
export enum AcceptanceStatus {
    Requested = 'requested',
    Accepted = 'accepted',
    Rejected = 'rejected'
}
interface Vendor{
    _id?:string;
    companyName:string;
    companyEmail:string;
    companyLocation:string;
    password:string;
    createdAt:Date;
    category:string;
    isAccepted:AcceptanceStatus;
    isBlocked:boolean;
}
function Vendors() {
    const [isBlocked,setIsBlocked] = useState<boolean>(false)
    const [requests,setRequests] = useState<Vendor[]>([])
    const [isLoading,setIsLodaing] = useState<boolean>(true)
    const [acceptReq,setAcceptReq] = useState<boolean>(false)
    const [rejectReq,setRejectReq] = useState<boolean>(false)
    const navigate = useNavigate()
      useEffect(   () => {
        const fetchData = async () =>{
          try {
            const vendorData =  await bringVendors()
            if(vendorData?.data.vendors){
                const vendorReqs= vendorData.data.vendors
            //    await setRequests(vendorReqs.map((venreq:any)=>{
            //         return venreq.isAccepted != 'accepted'
            //    }))
            // await setRequests(vendorReqs.map((reqq:any) =>reqq.isAccepted == 'accepted'))
             setRequests(vendorReqs.filter((prevreq:any)=>prevreq.isAccepted == AcceptanceStatus.Requested))
            }
            console.log("usd is",vendorData)
          } catch (error) {
            console.error('error during fetching data',error)
          }finally{
            setIsLodaing(false)
          }
       }
          fetchData()
      },[isLoading,acceptReq,rejectReq])
      const acceptRequest = async (requestId:string) =>{
        try {
          const res = await acceptVendorReq(requestId)
          if(res?.data.accepted){
            // setRequests(prevReqs => prevReqs.map(rq=>rq._id == requestId ?{...rq,isBlocked:false}:rq))
              toast.success('Request has been accepted')
              // window.location.href = '/admin/requests'
              setAcceptReq(true)
          }
        } catch (error) {
          
        }finally{
          setIsLodaing(false)
        }
      }

      const rejectRequest = async (vendorId:string) =>{
        try {
          const res = await rejectVendorReq(vendorId)
          if(res?.data.rejected){
              toast.error("Request has been rejected")
            setRejectReq(true)
          }
        } catch (error) {
          console.error(error)
        }
      }
   
    
      // if (isLoading) {
      //   return <div>Loading...</div>;
      // }
  return (
    <div className="overflow-x-auto p-4">
      <Toaster richColors />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Company Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Location
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
          {requests && requests.map((rq) => (
            <tr key={rq._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{rq.companyName}</div>
                    <div className="text-sm text-gray-500">{rq.companyEmail}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {rq.isAccepted}
                  </span> 
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq.companyEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq.companyLocation}</td>
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
  )
}

export default Vendors