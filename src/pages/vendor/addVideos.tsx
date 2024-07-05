import React from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'

function AddVideos() {
  return (
    <>
    <div className="flex ">
      <div className=' mt-5 hidden md:block'>
      <VendorSidebar/>
      </div>
          <div className="  flex-grow  m-10">  
            <div className='flex'>
            <h2 className='font font-serif text-2xl ms-4 text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold'>Videos</h2>
            <i className="fi fi-rr-video-camera-alt mt-3 ms-3 text-2xl"></i>
            </div>
                  <div className='me-3 p-6'>

                          <p className='text text-slate-900 text-sm mx-3 mt-2'>Showcase your work by adding videos to your Storefront.
                            Add unlimited videos related to your business and wedding services.</p>
                         <div className='h-52 border border-purple-300  sm:w-3/4 mt-3 ms-2 flex flex-col items-center justify-around p-4'>
                         <i className="fi fi-rr-video-camera-alt text-7xl"></i>
                         <input type='file' className='focus:outline-none border border-purple-200 rounded text-sm w-[90%]'/>
                            
                  <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-purple-500 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
                   hover:tracking-widest hover:bg-purple-500 hover:text-white
                    hover:shadow-lg hover:shadow-[rgba(93,24,220,0.5)] active:translate-y-2 
                    active:tracking-widest active:bg-purple-500 active:text-white active:shadow-none 
                    active:transition-none">Add Videos</button>
                    </div>
              </div>
              <div>
              </div>
          </div>
    </div>
</>
  )
}

export default AddVideos