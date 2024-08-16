
import React,{useState} from 'react'
import navLogo from '../../assets/license (3).png'
import {Link} from 'react-router-dom'

function AdminNavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const[linkText,setText] = useState('')
    const [linkPath,setLinkPath] = useState('')
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      };
    
  return (
    <nav className="bg-gray border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-8 p-2">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={navLogo} className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white text-red-500 font-serif">Magic Moments</span>
    </a>

    {/* Mobile Menu Toggle Button */}
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-dropdown"
      aria-expanded={isMobileMenuOpen}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 5h16M2 10h16m-7 5h7"
        />
      </svg>
    </button>

    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-dropdown">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link to='/adminprofile' className="block py-2 px-3 text-gray-900 rounded hover:bg-red-500 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-500 md:dark:hover:bg-transparent font-serif">Admin Profile</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default AdminNavBar