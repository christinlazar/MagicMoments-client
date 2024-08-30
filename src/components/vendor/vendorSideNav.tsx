import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {  vendorLogOut } from '../../store/slice/AuthSlice';
import {  useDispatch } from 'react-redux';
const VendorSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{

  },[])



  return (
    <>
    <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        } bg-gray-50 dark:bg-gray-800 mx-6`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-6 overflow-y-auto mt-4 mx-4 ">
          <ul className="space-y-2 font-medium">
          <li>
              <Link to='/vendor/vendorStore'
             
                className="flex items-center p-2 text-gray-900 hover:text-cyan-950  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fi fi-rr-apps mt-3"></i>
                <span className="ms-3 font-serif mt-2 font-bold text-sm">Business Details</span>
              </Link>
          </li>
          <li>
              <Link to='/vendor/services'
             
                className="flex items-center p-2 text-gray-900 hover:text-cyan-950  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <i className="fi fi-rr-mailbox mt-3"></i>
                <span className="ms-3 font-serif mt-2 font-bold text-sm">Services</span>
              </Link>
          </li>
            <li>
              <Link to='/vendor/eventBookings'
       
                className="flex items-center p-2 text-gray-900 hover:text-cyan-950  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className ="fi fi-rr-calendar-day mt-3"></i>
                <span className="ms-3 font-serif mt-2 font-bold text-sm">Event Bookings</span>
              </Link>
            </li>
            <li>
              <Link to='/vendor/addlocation'
         

                className="flex items-center p-2 text-gray-900 hover:text-cyan-950 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fi fi-rr-marker mt-3"></i>
                <span className="ms-3 font-serif mt-2 font-bold text-sm ">Location & map</span>
              </Link>
            </li>
            <li>
              <Link
             to='/vendor/addPhotos'
           

                className="flex items-center p-2 text-gray-900 hover:text-cyan-950  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className ="fi fi-rr-images"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-serif font-bold text-sm">Photos</span>
              </Link>
            </li>
            <li>
              <Link to='/vendor/addVideos'
           
           
                className="flex items-center p-2 text-gray-900 hover:text-cyan-950  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <i className ="fi fi-rr-video-camera-alt"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-serif font-bold text-sm">Videos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/dateAvailability"
          

                className="flex items-center p-2 text-gray-900 hover:text-cyan-950  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fi fi-rr-calendar-days mt-1"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-serif font-bold text-sm"> Add Availablity</span>
              </Link>
            </li>
            <li>
              <button
            //  to=""
                className="flex items-center p-2 text-gray-900 hover:text-cyan-950 font-bold  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fi fi-rr-sign-out-alt mt-1"></i>
                <span onClick={()=>dispatch(vendorLogOut())} className="flex-1 ms-3 whitespace-nowrap font-serif text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
  </>
  
      
  );
};

export default VendorSidebar;