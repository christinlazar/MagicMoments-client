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
    const [requests,setRequests] = useState<Vendor[]>([])
    const [isLoading,setIsLodaing] = useState<boolean>(true)
    const [acceptReq,setAcceptReq] = useState<boolean>(false)
    const [rejectReq,setRejectReq] = useState<boolean>(false)
    const [pageRange,setPageRange] = useState<number[]>([1,2,3])
    const [currentPage,setCurrentpage] = useState<number>(1)
    const navigate = useNavigate()
      useEffect(   () => {
        const fetchData = async () =>{
          try {
            const vendorData =  await bringVendors()
            if(vendorData?.data.vendors){
                const vendorReqs= vendorData.data.vendors
  
             setRequests(vendorReqs.filter((prevreq:any)=>prevreq.isAccepted == AcceptanceStatus.Requested))
            }
           
          } catch (error:any) {
            console.error('error during fetching data',error)
          }finally{
            setIsLodaing(false)
          }
       }
          fetchData()
          return()=>{
            setAcceptReq(false)
            setRejectReq(false)

          }
      },[isLoading,acceptReq,rejectReq])
      const acceptRequest = async (requestId:string) =>{
        try {
          const res = await acceptVendorReq(requestId)
          if(res?.data.accepted){
              toast.success('Request has been accepted')
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
        } catch (error:any) {
          console.error(error.message)

        }
      }

      const reqPerPage = 1
      const indexOfLastReq = reqPerPage * currentPage
      const indexOfFirstReq = indexOfLastReq - reqPerPage
      const currReqs = requests.slice(indexOfFirstReq,indexOfLastReq)

      const handlePageChange = (pageNumber:number) =>{
        if(pageNumber > Math.ceil(requests.length/reqPerPage)){
          return
        }
        setCurrentpage(pageNumber)
        if(pageNumber > pageRange[0] && pageNumber < requests.length){
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
    <div className="overflow-x-scroll p-4">
      <Toaster richColors />
      <table className="min-w-full divide-y divide-gray-200 ">
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
          {currReqs && currReqs.map((rq) => (
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
                    className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Accept
                </button>
              </td>
              <td>
              <button
                    onClick={() => rejectRequest(rq._id as string)}
                    className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
    requests.length > 0 && (
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
          disabled={currentPage === Math.ceil(requests?.length / reqPerPage)}
          className="mx-1 h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border rounded-md text-white bg-cyan-950 hover:bg-cyan-950"
      >
          Next
      </button>
      </div>
    )
  }
    </div>
  )
}

export default Vendors