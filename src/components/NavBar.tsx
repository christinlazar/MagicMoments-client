import React,{useEffect, useState} from 'react'
import navLogo from '../assets/wedding (2).png'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { userLogOut } from '../store/slice/AuthSlice';
import { getUserData } from '../api/userApi';
// interface RootState{
//   auth:{
//     userNotifcations:any
//   }
// }
interface User{
  _id?:string,
  name:string,
  email:string,
  image?:string,
  password:string,
  isBlocked:boolean,
  phone:number,
  wishlist:[],
  createdAt:Date
}
function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const[linkText,setText] = useState('')
    const [linkPath,setLinkPath] = useState('')
    const [userData,setuserData] = useState<User | any>()
    const location = useLocation()
    const {userInfo} = useSelector((state:RootState)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const wishListDisplay = useSelector((state:RootState)=>state.auth.wishlistDisplay)

    useEffect(()=>{

      async function fetchUser(){
        const response = await getUserData()
        if(response?.data.success){
          setuserData(response.data.user)
        }
      }
      fetchUser()
    const currentPath = location.pathname
   
    if(currentPath == '/register'){
      setText('Login')
      setLinkPath('/login')
    }else if(currentPath == '/login'){
      setText('Register')
      setLinkPath('/register')
    }else if(userInfo){
      setText('Logout')
      setLinkPath('/logout')
    }else if('/'){
      setText('Login')
      setLinkPath('/login')
    }


    },[location,userInfo,linkPath,wishListDisplay])


      const userNotifications = useSelector((state:RootState)=>state.auth.userNotifications)
     

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const logOut = async (linkPath:string) =>{
      if(linkPath == '/logout'){
           dispatch(userLogOut())
            navigate('/')
      }
    }

  return (
    <nav className="bg-gray  dark:bg-gray-900 dark:border-gray-700 h-16 fixed w-[100%] bg-white z-40">
    
    <div className=" flex flex-wrap items-center justify-between mx-8 p-4">
      <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={navLogo} className="h-8" alt="Flowbite Logo" />
        <span onClick={()=>navigate('/')} className="self-center text-xl font-bold whitespace-nowrap  dark:text-white text-blue-950 font-montserrat">Magic Moments</span>
      </a>
      <button
        onClick={toggleMobileMenu}
        type="button"
        className="inline-flex items-center  p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded={isMobileMenuOpen}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-dropdown">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            {
              userInfo ?
          <Link to='' onClick={()=>logOut(linkPath)} className="py-2 px-3 text-gray-900 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-montserrat">Logout</Link>:
          <Link to={linkPath} onClick={()=>logOut(linkPath)} className="block py-2 px-3 text-gray-900 rounded hover:text-white hover:bg-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent font-montserrat">{linkText}</Link>
            }
          </li>
          <li>
             <Link to='/profile' className="block py-2 px-3 text-gray-900 rounded hover:bg-cyan-950  md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0 dark:text-white hover:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent  font-montserrat">Profile</Link>
          </li>
          {
            isMobileMenuOpen ? (
              <li onClick={()=>navigate('/wishlist')} className="relative hover:cursor-pointer">
              {/* <i className="fi fi-rr-heart text-cyan-950 "></i> */}
              <div>
              <span className='text-md text-gray-900 font-montserrat px-3 '>wishlist</span>

              </div>
               {userData?.wishlist?.length > 0 && ( 
              <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {userData?.wishlist.length} 
              </span>
            )}
          </li>
            ):(
              <li onClick={()=>navigate('/wishlist')} className="relative hover:cursor-pointer">
              <i className="fi fi-rr-heart text-cyan-950 "></i>
               {userData?.wishlist?.length > 0 && ( 
              <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {userData?.wishlist.length} 
              </span>
            )}
          </li>
            )
          }
       
          <li className=''>
             <Link to='/bookingDetials' className="block py-2 px-3 text-gray-900 rounded hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-500 md:dark:hover:bg-transparent  font-montserrat sm:hidden hover:text-white">Booking Detials</Link>
          </li>
          <li>
             <Link to='/bookingRequests' className="block py-2 px-3 text-gray-900 rounded hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-500 md:dark:hover:bg-transparent  font-montserrat sm:hidden hover:text-white">Booking Requests</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavBar