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
  <div className="overflow-x-auto p-4 sm:p-10">
    <div className='flex justify-between items-center ms-14 mb-4'>
      <h1 className='font-montserrat text-xl font-bold text-cyan-900'>ADMIN DASHBOARD</h1>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10 rounded-lg">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-md font-bold font-montserrat text-cyan-800">Total Revenue</h1>
        <p className="text-sm font-bold rounded-full shadow-xl text-black p-3">Rs. {totalRevenue}</p> 
      </div>
      
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-md font-bold font-montserrat text-cyan-800">Total Vendors</h1>
        <p className="text-sm font-bold  rounded-full shadow-xl text-black p-3">{vendorCount}</p> 
      </div>
      
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-md font-bold font-montserrat text-cyan-800">Total Users</h1>
        <p className="text-sm font-bold rounded-full shadow-xl text-black p-3">{userCount}</p>
      </div>
    </div>
    <div className="mt-6">
      <Chart />
    </div>
  </div>
</>


  )
}

export default AdminDashBoard