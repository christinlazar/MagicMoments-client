import React,{useEffect,useState} from 'react'
import { Toaster,toast } from 'sonner'
import { bringVendors ,blockVendor,unblockVendor,acceptVendorReq,rejectVendorReq, fetchbookings, bringFilteredData} from '../../api/adminApi';
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



function Bookings() {

    const [pageRange,setPageRange] = useState<number[]>([1,2,3])
    const [currentPage,setCurrentpage] = useState<number>(1)
    const [bookings,setBookings] = useState<any>([])
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [updating,setUpdating] = useState<boolean>(false)

      useEffect(() => {
        const fetchBookings = async () =>{
            const response = await fetchbookings()
            if(response?.data.success){
                setBookings(response.data.bookings)
            }
        }
        fetchBookings()
        return () =>{
          setUpdating(false)
        }
      },[])


      const reqPerPage = 5
      const indexOfLastReq = reqPerPage * currentPage
      const indexOfFirstReq = indexOfLastReq - reqPerPage
      const currBookings = bookings.slice(indexOfFirstReq,indexOfLastReq)

      const handlePageChange = (pageNumber:number)=>{
        if(pageNumber > Math.ceil(bookings.length/reqPerPage)){
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



      const handleFilter = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(startDate.trim() == '' || endDate.trim() == ''){
            return toast.error("please select start date and end date")
        }
        const response = await bringFilteredData(startDate,endDate)
        if(response?.data){
          if(response.data.bookings.length == 0){
            toast.error('No bookings on these dates')
          }
          setBookings(response?.data.bookings)
        }
      }

  return (
    <div className="overflow-x-scroll p-8">
        <form onSubmit={handleFilter}>
      <div className='flex mb-10 ms-10'>
        <div className='flex flex-col items-center justify-center'>
        <label className='text-sm font-bold font-montserrat p-2 text-cyan-950'>Start Date</label>
        <input onChange={(e)=>setStartDate(e.target.value)} value={startDate} type='date' className='border rounded-full text-center text-xs border-gray-400 '></input>
        </div>
        <div className='flex flex-col items-center justify-center ps-20'>
        <label className='text-sm font-bold font-montserrat p-2 text-cyan-950'>End Date</label>
        <input onChange={(e)=>setEndDate(e.target.value)}  value={endDate} type='date' className='border rounded-full text-center text-xs border-gray-400 '></input>
        </div>
        <button type='submit' className='rounded-full h-5 w-20 font-montserrat bg-cyan-950 text-white text-xs mt-9 ms-10'>Filter</button>
      </div>
      </form>
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
              Client
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payment-Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             booking-date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             Amount paid
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reject
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currBookings && currBookings.map((rq:any) => (
            <tr key={rq._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml">
                    <div className="text-sm font-medium text-gray-900">{rq.vendorId.companyName}</div>
                    <div className="text-sm text-gray-500">{rq.vendorId.companyEmail}</div>
                  </div>
                </div>
              </td>
           
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq.userId.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ms-2">{`${new Date(rq.createdAt).getDate()}-${new Date(rq.createdAt).getMonth()}-${new Date(rq.createdAt).getFullYear()}`}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rq.startingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs.{rq.amountPaid}</td>
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
          disabled={currentPage === Math.ceil(bookings?.length / reqPerPage)}
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

export default Bookings