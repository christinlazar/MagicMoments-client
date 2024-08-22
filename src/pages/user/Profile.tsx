import React, { useState ,useEffect} from 'react'
import { getUserData, profileSubmission } from '../../api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/Store'
import { useNavigate } from 'react-router-dom'
import { userLogOut } from '../../store/slice/AuthSlice'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'

interface User{
  _id?:string,
  name:string,
  email:string,
  image?:string,
  password:string,
  isBlocked:boolean,
  phone:number,
  wishlist:string[],
  createdAt:string
}
function Profile() {
  
  const dispatch = useDispatch()
  const [userData,setUserData] = useState<User>()
  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo')
    if(!userInfo){
      dispatch(userLogOut())
    }
    async function getUserInfo(){
    const response = await getUserData()
    setUserData(response?.data.user)
    }
    getUserInfo()
  },[dispatch])
  const [content,setContent] = useState<string>('')
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
   e.preventDefault()
    try {
      const res = await profileSubmission(content)
    } catch (error:any) {
      console.error(error)
    }
  }
  return (
  <div className="flex ps-12">
    <Toaster richColors position="bottom-right" />
        <div className='mt-20 hidden md:block'>
            <SideBar/>
        </div>
      <div className='flex flex-col overflow-x-auto h-full w-full mt-28 border me-4'>
        <div className='flex p-4'>
        <h1 className='font-bold font-montserrat text-xl ms-2 md:ms-14 mb-6 text-cyan-800 shadow-sm'>PROFILE</h1>
        <i className="fi fi-rr-user-trust ms-4  text-xl"></i>
        </div>
        <div className='md:ps-8 mb-4 md:ms-4 '>
          <p className='text-black p-3 shadow-sm'>
        {
          `HI ${userData?.name} Welcome to your profile! We’re so excited to be part of your journey. Here, 
          we celebrate love, laughter, and the beautiful moments that make your story unique.
           Every picture tells a tale, and we can’t wait to capture yours.
            Whether you’re planning a dreamy wedding or a sweet engagement session, know that our passion is to create memories you’ll cherish forever. Take a moment to explore your profile, connect with our talented photographers, and let us help you turn your dreams into reality. 
          Remember, every love story is special, and we’re honored to be part of yours!`
        }
          </p>
        </div>
      <form className="max-w-sm mx-3 md:mx-14">
      <div className="mb-5  ">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-cyan-800 dark:text-white "
        >
         Username
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border shadow-lg focus:outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={userData?.name}
          readOnly
        />
      </div>
      <div className="mb-5 ">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-cyan-800 dark:text-white"
        >
          Email
        </label>
        <input
        value={userData?.email}
          className="bg-gray-50 border shadow-lg focus:outline-none border-gray-300 text-cyan-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          
          readOnly
        />
      </div>
      <div className="mb-5 ">
        <label
          htmlFor="password"
          className="block mb-2  text-sm font-medium text-cyan-800 dark:text-white"
        >
          Phone
        </label>
        <input
        value={userData?.phone}
          className="bg-gray-50 border shadow-lg focus:outline-none border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          
          readOnly
        />
      </div>
   
      <div className="flex items-start mb-5">
        {/* <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div> */}
        {/* <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label> */}
      </div>
      {/* <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button> */}
    </form>
      </div>
    </div>
  )
}

export default Profile