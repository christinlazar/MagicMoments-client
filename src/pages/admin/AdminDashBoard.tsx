import { useEffect, useState } from 'react'

import React  from 'react'
import AdminSidebar from '../../components/admin/adminSideNav'
import Chart from '../../components/admin/Chart'
import { getUsersVendors, weeklyBooking, yearlyBooking } from '../../api/adminApi'

function AdminDashBoard() {
    const [chartData,setChartData] = useState([])
    const [userCount,setuserCount] = useState<number>(0)
    const [vendorCount,setVendorCount] = useState<number>(0)
    const [totalRevenue,setTotalRevenue] = useState<number>(0)
    const [data,setDataprops] = useState('')
    useEffect(()=>{
      async function getusersvendors(){
      const response = await getUsersVendors()
      if(response?.data.success){
        console.log(response.data)
        setTotalRevenue(response?.data?.result.revenue)
        setVendorCount(response.data.result.vendors.length)
        setuserCount(response.data.result.users.length)
      }
      }
      getusersvendors()
    },[])


  return (
    <>
  {/* <div className="border border-gray-500"></div> */}
<div className="overflow-x-auto p-4 sm:p-10 ">
  <div className='flex justify-between  '>
  <h1 className='font-montserrat text-xl font-bold text-black '>ADMIN DASHBORAD</h1>
  {/* <select onChange={(e)=>setDataprops(e.target.value)}  className='border rounded-xl shadow-md font-montserrat text-xs w-24  ps-2 me-2'>
      <option value="" disabled selected>Month</option>
      <option value="year">Year</option>
      <option value="week">Week</option>
  </select> */}
  </div>
<div className="flex justify-between p-10  rounded-lg  ">
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-md font-bold font-montserrat text-black">Total Revenue</h1>
    <p className="text-sm font-semibold font-montserrat rounded-full shadow-xl text-black p-3">Rs.{totalRevenue}</p> {/* Example data */}
  </div>
  
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-md font-bold font-montserrat text-black">Total Vendors</h1>
    <p className="text-sm font-semibold font-montserrat rounded-full shadow-xl text-black p-3">{vendorCount}</p> {/* Example data */}
  </div>
  
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-md font-bold font-montserrat text-black">Total Users</h1>
    <p className="text-sm font-semibold font-montserrat rounded-full shadow-xl text-black p-3">{userCount}</p> {/* Example data */}
  </div>
</div>
    <div>
      <div>
        {/* <span className=' text-xl font-montserrat font-bold text-green-600'>
          MONTHLY_DATAS
        </span> */}
      </div>
      <Chart />
    </div>
  </div>
</>
  )
}

export default AdminDashBoard