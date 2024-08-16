import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { adminLogOut, userLogOut } from '../../store/slice/AuthSlice';
import {  useDispatch } from 'react-redux';
const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeLink,setActiveLink] = useState('/admin/dashboard')
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 
  const handleLinkClick = (link:string) => {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",link)
    setActiveLink(link); 
  };
  return (
    <>
    <button
        onBlur={() => isOpen && toggleSidebar()} // Close sidebar on blur
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        } bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full ms-2 py-6 overflow-y-auto mt-12">
          <ul className="space-y-2 font-medium">
            <li className='ms-2'>
              <Link
                to='/admin/dashboard'
                onClick={() => handleLinkClick('/admin/dashboard')}
                className={`flex items-center ps-6 pb-6 ${activeLink === '/admin/dashboard' ? 'border border-cyan-950 me-1' : ''} rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <i className="fi fi-rr-apps mt-3 text-cyan-800"></i>
                <span className="ms-3 text-cyan-800 font-serif mt-2">Dashboard</span>
              </Link>
            </li>
            <li className='ms-2'>
              <Link
                to='/admin/requests'
                onClick={() => handleLinkClick('/admin/requests')}
                className={`flex items-center ps-6 pb-6 ${activeLink === '/admin/requests' ?  'border border-cyan-950 me-1' : ''} rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <i className="fi fi-rr-envelope mt-1 text-cyan-800"></i>
                <span className="flex-1 text-cyan-800 ms-3 whitespace-nowrap font-serif">Requests</span>
              </Link>
            </li>
            <li className='ms-2'>
              <Link
                to='/admin/users'
                onClick={() => handleLinkClick('/admin/users')}
                className={`flex items-center ps-6 pb-6 ${activeLink === '/admin/users' ?  'border border-cyan-950 me-1' : ''} rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <i className="fi fi-rr-users-alt mt-1 text-cyan-800"></i>
                <span className="flex-1 text-cyan-800 ms-3 whitespace-nowrap font-serif">Users</span>
              </Link>
            </li>
            <li className='ms-2'>
              <Link
                to="/admin/vendors"
                onClick={() => handleLinkClick('/admin/vendors')}
                className={`flex items-center ps-6 pb-6 ${activeLink === '/admin/vendors' ?  'border border-cyan-950 me-1' : ''} rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <i className="fi fi-rr-user-headset mt-1 text-cyan-800"></i>
                <span className="flex-1 text-cyan-800 ms-3 whitespace-nowrap font-serif">Vendors</span>
              </Link>
            </li>
            <li className='ms-2'>
              <button
                type="button"
                className="flex items-center ps-6 pb-6 text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => {
                  dispatch(adminLogOut());
                  setActiveLink(''); // Reset active link on logout if needed
                }}
              >
                <i className="fi fi-rr-sign-out-alt mt-1"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-serif text-cyan-800">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
  </>

  
      
  );
};

export default AdminSidebar;