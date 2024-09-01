import { useState} from 'react'
import navLogo from '../../assets/wedding (2).png'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { vendorLogOut } from '../../store/slice/AuthSlice';
function VendorNavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
   
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
        
          <Link to='/vendor/vendorStore' className="block py-2 px-3 text-slate-500 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Store</Link>
          <Link to='/vendor/vendorChat' className="block py-2 px-3 text-slate-500 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Message</Link>
          <Link to='/vendor/eventBookings' className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Bookings</Link>
          <Link to='/vendor/services' className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">services</Link>
          <Link to='/vendor/addlocation' className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Location & Map</Link>
          <Link to='/vendor/addPhotos' className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Photos</Link>
          <Link to='/vendor/addVideos' className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Videos</Link>
          <Link to='/vendor/dateAvailability' className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Availability</Link>
          <span onClick={()=>dispatch(vendorLogOut())}className="block py-2 px-3 text-slate-950 rounded hover:text-white hover:bg-cyan-950 md:hover:bg-transparent md:border-0 md:hover:text-cyan-950 md:p-0 dark:text-white md:dark:hover:text-cyan-950 dark:hover:bg-gray-700 dark:hover:text-cyan-950 md:dark:hover:bg-transparent font-serif">Logout</span>

          </li>
        </ul>
      </div> 
    </div>
  </nav>
      <nav className="hidden ps-44 md:block  bg-black bg-gray  dark:bg-gray-900 dark:border-gray-700 h-20 border border-slate-400 border-opacity-45 w-screen">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-start mx-0 py-6 ">
       
        <div className='px-10'>
        <i className="fi fi-rr-store-alt text-2xl text-white mt-2"></i>
        <span onClick={()=>navigate('/vendor/vendorStore')} className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200 hover:cursor-pointer">Store</span>
        </div>
        <div className='px-10'>
        <i className="fi fi-rr-messages text-2xl text-white mt-2"></i>
        <span onClick={()=>navigate('/vendor/vendorChat')} className="flex-1 ms-3 whitespace-nowrap text-sm font-serif font-bold text-slate-200 hover:cursor-pointer">Messages</span>
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