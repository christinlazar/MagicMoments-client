import { useEffect, useState } from 'react'
import { BlockUser, bringUsers ,unblockUser} from '../../api/adminApi'
import { toast,Toaster } from 'sonner'
import { useSelector } from 'react-redux'

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

interface RootState{
  auth:{
    userInfo:string
  }
}

function Users() {
  const [isBlocked,setIsBlocked] = useState<boolean>(false)
const [users,setUsers] = useState<User[]>([])
const [isLoading,setIsLodaing] = useState<boolean>(true)
const [currentPage,setCurrentpage] = useState<number>(1)
const [pageRange, setPageRange] = useState([1,2,3])
  useEffect(   () => {
    const fetchData = async () =>{
      try {
        const userData =  await bringUsers()
        if(userData?.data.userData){
           await setUsers(userData?.data.userData)
        }
      } catch (error:any) {
        console.error(error)
      }finally{
        setIsLodaing(false)
      }
   }
      fetchData()
  },[isLoading])
  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const unBlockUser = async (userId:string | undefined) =>{
        const res = await unblockUser(userId as string)
        if(res?.data.message){
          await setUsers(prevUsers => prevUsers.map(user=>user._id == userId ?{...user,isBlocked:false}:user))
          toast.success('User has been unblocked')
        }
  }
   
  const blockUser = async (userId:string | undefined) =>{
      const res = await BlockUser(userId as string)
      if(res?.data.success){
        localStorage.removeItem('userInfo')
         setUsers(prevUsers => prevUsers.map(user=>user._id == userId ?{...user,isBlocked:true}:user))
        toast.error('User has been blocked')
      }
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const userPerPage = 1
  const indexOfLastReq = userPerPage * currentPage
  const indexOfFirstReq = indexOfLastReq - userPerPage
  const currUsers = users.slice(indexOfFirstReq,indexOfLastReq)

  const handlePageChange = (pageNumber:number) =>{
    if(pageNumber > Math.ceil(users.length/userPerPage)){
      return
    }
    setCurrentpage(pageNumber)
    if(pageNumber > pageRange[0] && pageNumber < users.length){
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
          {currUsers && currUsers.map((user) => (
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
                    className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out focus:outline-none "
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockUser(user._id)}
                    className="inline-block rounded bg-cyan-950 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out focus:outline-none "
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
    users.length > 0 && (
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
          disabled={currentPage === Math.ceil(users?.length / userPerPage)}
          className="mx-1 h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border rounded-md text-white bg-cyan-950 hover:bg-cyan-950"
      >
          Next
      </button>
      </div>
    )
  }
    </div>
    </>

  )
}


export default Users