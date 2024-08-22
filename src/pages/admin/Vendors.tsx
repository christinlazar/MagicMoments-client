import React,{useEffect,useState} from 'react'
import { Toaster,toast } from 'sonner'
import { bringVendors ,blockVendor,unblockVendor} from '../../api/adminApi';
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
    const [vendors,setVendors] = useState<Vendor[]>([])
    const [isLoading,setIsLodaing] = useState<boolean>(true)
    const [pageRange,setPageRange] = useState<number[]>([1,2,3])
    const [currentPage,setCurrentpage] = useState<number>(1)
      useEffect(   () => {
        const fetchData = async () =>{
          try {
            const vendorData =  await bringVendors()
            if(vendorData?.data.vendors){
               await setVendors(vendorData?.data.vendors)
            }
          } catch (error:any) {
      
            console.error(error.message || "error during fetching data")
          }finally{
            setIsLodaing(false)
          }
       }
          fetchData()
      },[isLoading])
    
      const unBlockvendor = async (vendorId:string | undefined) =>{
            const res = await unblockVendor(vendorId as string)
            if(res?.data.success){
              localStorage.removeItem('vendorInfo')
               setVendors(prevVendors => prevVendors.map(vendor=>vendor._id == vendorId ?{...vendor,isBlocked:false}:vendor))
              toast.success('Vendor has been unblocked')
            }
      }
       
      const blockvendor = async (vendorId:string | undefined) =>{
          const res = await blockVendor(vendorId as string)
          if(res?.data.success){
            await setVendors(prevVendors => prevVendors.map(vendor=>vendor._id == vendorId ?{...vendor,isBlocked:true}:vendor))
            toast.error('Vendor has been blocked')
          }
      }
    
      // if (isLoading) {
      //   return <div>Loading...</div>;
      // }

      const vendorPerPage = 1
      const indexOfLastReq = vendorPerPage * currentPage
      const indexOfFirstReq = indexOfLastReq - vendorPerPage
      const currvendors = vendors.slice(indexOfFirstReq,indexOfLastReq)
    
      const handlePageChange = (pageNumber:number) =>{
        if(pageNumber > Math.ceil(vendors.length/vendorPerPage)){
          return
        }
        setCurrentpage(pageNumber)
        if(pageNumber > pageRange[0] && pageNumber < vendors.length){
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
    <div className="overflow-x-auto p-4">
      <Toaster richColors />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
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
              Phone
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currvendors && currvendors.map((vendor) => (
            <tr key={vendor._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{vendor.companyName}</div>
                    <div className="text-sm text-gray-500">{vendor.companyEmail}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!vendor.isBlocked ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Blocked
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.companyLocation}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.companyEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {vendor.isBlocked ? (
                  <button
                    onClick={() => unBlockvendor(vendor._id)}
                    className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out focus:outline-none"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockvendor(vendor._id)}
                    className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out focus:outline-none"
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
    vendors.length > 0 && (
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
          disabled={currentPage === Math.ceil(vendors?.length / vendorPerPage)}
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