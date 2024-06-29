import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { BlockUser, bringUsers ,unblockUser} from '../../api/adminApi'
import { toast,Toaster } from 'sonner'

interface User{
  _id?:string,
  name:string,
  email:string,
  image?:string,
  password:string,
  isBlocked:boolean,
  phone:string,
  createdAt:Date
}

function Users() {
  const [isBlocked,setIsBlocked] = useState<boolean>(false)
const [users,setUsers] = useState<User[]>([])
const [isLoading,setIsLodaing] = useState<boolean>(true)
  useEffect(   () => {
    const fetchData = async () =>{
      try {
        const userData =  await bringUsers()
        if(userData?.data.userData){
           await setUsers(userData?.data.userData)
        }
        console.log("usd is",userData)
      } catch (error) {
        console.error('error during fetching data',error)
      }finally{
        setIsLodaing(false)
      }
   }
      fetchData()
  },[isLoading])

  const unBlockUser = async (userId:string | undefined) =>{
        const res = await unblockUser(userId as string)
        console.log(res)
        if(res?.data.message){
          await setUsers(prevUsers => prevUsers.map(user=>user._id == userId ?{...user,isBlocked:false}:user))
          toast.success('User has been unblocked')
        }
  }
   
  const blockUser = async (userId:string | undefined) =>{
      const res = await BlockUser(userId as string)
      if(res?.data.success){
        await setUsers(prevUsers => prevUsers.map(user=>user._id == userId ?{...user,isBlocked:true}:user))
        toast.error('User has been blocked')
      }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
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
          {users && users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!user.isBlocked ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Blocked
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {user.isBlocked ? (
                  <button
                    onClick={() => unBlockUser(user._id)}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none active:bg-primary-700"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockUser(user._id)}
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
    </>

  )
}


export default Users