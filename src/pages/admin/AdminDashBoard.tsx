import { useState } from 'react'

import React  from 'react'
import AdminSidebar from '../../components/admin/adminSideNav'

function AdminDashBoard() {
    const [users,setUsers] = useState([])
  return (
    <>
  <div className="border border-black"></div>
<div className="overflow-x-auto p-4 sm:p-10 md:p-20">
    <h1>ADMIN DASHBORAD</h1>
  </div>
</>
  )
}

export default AdminDashBoard