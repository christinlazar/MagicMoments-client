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
      useEffect(   () => {
        const fetchData = async () =>{
          try {
            const vendorData =  await bringVendors()
            if(vendorData?.data.vendors){
               await setVendors(vendorData?.data.vendors)
            }
            console.log("usd is",vendorData)
          } catch (error) {
            console.error('error during fetching data',error)
          }finally{
            setIsLodaing(false)
          }
       }
          fetchData()
      },[isLoading])
    
      const unBlockvendor = async (vendorId:string | undefined) =>{
            const res = await unblockVendor(vendorId as string)
            console.log(res)
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
          {vendors && vendors.map((vendor) => (
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
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockvendor(vendor._id)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Vendors