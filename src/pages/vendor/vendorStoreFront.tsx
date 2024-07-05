import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Store'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { Navigate, Outlet } from 'react-router-dom'
import VendorNavBar from '../../components/vendor/vendorNavBar'

function VendorStoreFront() {

        return(
            <>
              <div className="flex">
                <div className='hidden md:block'>
                <VendorSidebar/>
                </div>
                    <div className="flex-grow ms-6 mt-10">
                        <div className='md:w-screen'>
                        <h2 className='font font-serif text-2xl ms-4 text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold'>Add your Buisness Informations</h2>
                        </div>
                            <h4 className='font-bold ms-4 mt-5 text-slate-900 font-serif'>Login information</h4>
                            <div className='h-20 ms-3 mt-4 w-1/4 '>
                                <span className='text-sm font-bold text-slate-900 ms-2 shadow'>Company Name</span>
                                <div>
                               <input className='text-sm ms-2 focus:outline-none' placeholder='Magic motion studio' readOnly/>
                                </div>
                            </div>
                            <div className='me-3'>
                                <h5 className='ps-5 text-slate-900 font-bold'>Describe your buisness & services</h5>
                                <div className='h-38 border border-purple-300 mt-3 ms-3'>
                                    <p className='text text-slate-900 text-sm mx-3 mt-2'>Want to impress couples? Introduce yourself! Explain why your business is the key ingredient in their wedding. Our team of writers will use the information you provide to create an attractive ad.
                                    Pro tip: Describe your products and services. Explain how you work with couples. Share a sweet or surprising story. No contact details, please.</p>
                                    <textarea
                                        className=' mt-0 focus:outline-none border border-purple-300 w-full text-sm p-3 placeholder:text-sm value:text-sm'
                                        placeholder='Type your description here...'
                                        />
                                </div>
                            </div>
                        <div>
                  
                        <form method='POST' >
                            <h5 className='mx-6 mt-6 font-bold text-purple-500'>Contact details</h5>
                            <div className='flex flex-col sm:flex-row justify-start ms-4 pt-2 '>
                            <div className='flex flex-col mx-3'>
                                <label className='text text-sm mt-3 text-purple-600  font-bold' htmlFor='name'>Contact person</label>
                                <input  className='placeholder:text-sm w-52 text-sm h-10 focus:outline-none border border-purple-400 rounded  '/>
                            </div>
                            <div className='flex flex-col mx-1'>
                                <label className='text text-sm mt-3 ms-3 text-purple-600   font-bold' htmlFor='name'>Email</label>
                                <input  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-purple-400 rounded  ms-2'/>
                            </div>
                            <div className='flex flex-col mx-1'>
                                <label className='text text-sm mt-3 ms-3 text-purple-600   font-bold' htmlFor='name'>Phone number</label>
                                <input  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-purple-400 rounded ms-2'/>
                            </div>
                            <div className='flex flex-col mx-1'>
                                <label className='text text-sm mt-3 ms-3 text-purple-600   font-bold' htmlFor='name'>Instagram Link</label>
                                <input  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-purple-400 rounded ms-2'/>
                            </div>
                            <div className='flex flex-col mx-1'>
                                
                            <button className="px-10 mt-4 py-4 rounded-full cursor-pointer text-white border-0 bg-purple-500 shadow-md tracking-wider uppercase text-sm transition-all duration-500 ease-linear
                             hover:tracking-widest hover:bg-purple-500 hover:text-white
                              hover:shadow-lg hover:shadow-[rgba(93,24,220,0.5)] active:translate-y-2 
                              active:tracking-widest active:bg-purple-500 active:text-white active:shadow-none 
                              active:transition-none">Save</button>

                                </div>
                            </div>
                           </form>
                    
                        </div>
                    </div>
              </div>
          </>

  )
}

export default VendorStoreFront