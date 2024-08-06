import React,{useEffect, useState} from 'react'
import navLogo from '../../assets/wedding (2).png'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../store/Store';
import { vendorLogOut } from '../../store/slice/AuthSlice';
function VendorNavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const[linkText,setText] = useState('')
    const [linkPath,setLinkPath] = useState('')
    const location = useLocation()
    const {userInfo} = useSelector((state:RootState)=> state.auth)
    const {vendorInfo} = useSelector((state:RootState)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const logOut = async () =>{
           dispatch(vendorLogOut())
            navigate('/vendor/vendorLogin')
    }
  return (
    <>
    <nav className="border-gray-200 dark:bg-gray-900 dark:border-gray-700 h-20 border  border-opacity-45 w-screen">
    <div className="md:max-w-screen-xl flex flex-wrap items-center justify-between mx-6 sm:mx-20 py-4">
      <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={navLogo} className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white text-cyan-950 font-montserrat">Magic Moments</span>
      </a>
       <button
        onClick={toggleMobileMenu}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded={isMobileMenuOpen}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button> 
       <div className={`${isMobileMenuOpen ? 'block' : 'hidden '} w-full  md:w-auto z-20`} id="navbar-dropdown">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

          <li>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Profile</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Store</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Message</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Reviews</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Business Details</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Location & Map</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Photos</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Videos</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Availability</Link>
          <Link to='/VendorProfile' className="block py-2 px-3 text-slate-500 rounded hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-purple-500 md:dark:hover:bg-transparent font-serif">Logout</Link>

          </li>
        </ul>
      </div> 
    </div>
  </nav>
      <nav className="hidden  md:block  bg-black bg-gray  dark:bg-gray-900 dark:border-gray-700 h-20 border border-slate-400 border-opacity-45 w-screen">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-start mx-0 py-6 ">
        {/* <div >
        <i className="fi fi-rr-home text-2xl mt-2"></i>
        <span className="flex-1 ms-3 whitespace-nowrap font-serif">Home</span>
        </div> */}
        <div className='pl-20 pr-10'>
        <i className="fi fi-rr-store-alt text-2xl text-white mt-2"></i>
        <span className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200">Profile</span>
        </div>
        <div className='px-10'>
        <i className="fi fi-rr-store-alt text-2xl text-white mt-2"></i>
        <span onClick={()=>navigate('/vendor/vendorStore')} className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200 hover:cursor-pointer">Store</span>
        </div>
        <div className='px-10'>
        <i className="fi fi-rr-messages text-2xl text-white mt-2"></i>
        <span onClick={()=>navigate('/vendor/vendorChat')} className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200 hover:cursor-pointer">Messages</span>
        </div>
        <div className='px-10'>
        <i className="fi fi-rr-review text-2xl text-white mt-2"></i>
        <span className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200">Reviews</span>
        </div>
        <Link to='/vendor/bookingRequests' className='px-10'>
        <i className="fi fi-rr-review text-2xl text-white mt-2"></i>
        <span className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200">Booking Requests</span>
        </Link>
        <Link to='/vendor/paymentDetials' className='px-10'>
        <i className="fi fi-rr-review text-2xl text-white mt-2"></i>
        <span className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200">payment Detials</span>
        </Link>
        </div>
     </nav>
     </>
  )
}

export default VendorNavBar