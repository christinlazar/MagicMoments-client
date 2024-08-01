import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Store'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { Navigate, Outlet } from 'react-router-dom'
import VendorNavBar from '../../components/vendor/vendorNavBar'
import { addStoreDetails, getVendorData } from '../../api/vendorApi'
import {toast,Toaster} from 'sonner'
import useListenMessages from '../../hooks/useListenMessages'
function VendorStoreFront() {
        const [description,setDescription] = useState<string>('')
        const [phoneNumber,setPhoneNumber] = useState<string>('')
        const [startingPrice,setStartingPrice] = useState<string>('')
        const [vendorData,setVendorData] = useState<any>()
            useListenMessages()
            useEffect(()=>{
                const getvendorData = async () =>{
                const vendorData = await getVendorData()
                console.log("vendorData is",vendorData)
                if(vendorData){
                    setVendorData(vendorData.data.data)
                }
                }
                getvendorData()
            },[])
        
        const submitCompanyDetails = async (e:React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            try {
                const formData = {
                    description,
                    phoneNumber,
                    startingPrice
                }
                const response = await addStoreDetails(formData)
                if(response?.data.success){
                    toast.success("Detials has been added successfully")
                }else{
                    toast.error("Something went wrong,try again")
                }
            } catch (error) {
                console.error(error)
            }
        }
        return(
            <>
              <div className="flex ps-12">
                <Toaster richColors position='bottom-right'/>
                <div className='hidden md:block'>
                <VendorSidebar/>
                </div>
                    <div className="flex-grow ms-6 mt-10">
                        <div className='md:w-screen'>
                        <h2 className='font text-2xl ms-4 text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold font-montserrat'>Add your Buisness Informations</h2>
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
                                    {
                                        vendorData && vendorData.description ? (
                                            <textarea value={vendorData.description}
                                                className=' mt-0 focus:outline-none border border-purple-300 w-full text-sm p-3 placeholder:text-sm value:text-sm'
                                                readOnly
                                                />
                                        ):
                                        (
                                            <textarea value={description}
                                            onChange={(e)=>setDescription(e.target.value)}
                                                className=' mt-0 focus:outline-none border border-purple-300 w-full text-sm p-3 placeholder:text-sm value:text-sm'
                                                placeholder='Type your description here...'
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        <div>
                            {
                                vendorData && vendorData?.description && vendorData.phoneNumber && vendorData.startingPrice ?
                                (
                                    
                        <form method='POST'>
                        <h5 className='mx-6 mt-6 font-bold  text-cyan-950'>Contact details</h5>
                        <div className='flex flex-col sm:flex-row justify-start ms-2 pt-2 '>
                        <div className='flex flex-col mx-1'>
                            <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='name'>Phone number</label>
                            <input value={vendorData.phoneNumber} readOnly className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-cyan-950 rounded ms-2 text-center'/>
                        </div>
                        <div className='flex flex-col mx-1'>
                            <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='name'>Starting price</label>
                            <input value={vendorData.startingPrice}  readOnly className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-cyan-950 rounded ms-2 text-center'/>
                        </div>
                        <div className='flex flex-col mx-1'>
                            
                        <button className="px-10 mt-4 py-4 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-sm transition-all duration-500 ease-linear
                         hover:tracking-widest hover:bg-cyan-950 hover:text-white
                          hover:shadow-lg hover:shadow-[rgba(20,24,54,0.93)] active:translate-y-2 
                          active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
                          active:transition-none">Edit detials</button>
                            </div>
                        </div>
                        </form>
                                ):(
                                    <form method='POST'onSubmit={submitCompanyDetails}>
                                    <h5 className='mx-6 mt-6 font-bold  text-cyan-950'>Contact details</h5>
                                    <div className='flex flex-col sm:flex-row justify-start ms-2 pt-2 '>
                                    <div className='flex flex-col mx-1'>
                                        <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='name'>Phone number</label>
                                        <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-cyan-950 rounded ms-2'/>
                                    </div>
                                    <div className='flex flex-col mx-1'>
                                        <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='name'>Starting price</label>
                                        <input value={startingPrice} onChange={(e)=>setStartingPrice(e.target.value)}  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-cyan-950 rounded ms-2'/>
                                    </div>
                                    <div className='flex flex-col mx-1'>
                                        <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='services'>Services</label>
                                    
                                    {/* <select multiple >
                                        <option value='Engagement Photography'>Engagement Photography</option>
                                        <option value='Wedding Day Photography'>Wedding Day Photography</option>
                                        <option value='Bridal Portraits'>Bridal Portraits</option>
                                        <option value='Groom Portraits'>Groom Portraits</option>
                                        <option value='Videography Services'>Videography Services</option>
                                    </select> */}

                                        
                                      
                                    </div>
                                    <div className='flex flex-col mx-1'>
                                        
                                    <button className="px-10 mt-4 py-4 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-sm transition-all duration-500 ease-linear
                                     hover:tracking-widest hover:bg-cyan-950 hover:text-white
                                      hover:shadow-lg hover:shadow-[rgba(20,24,54,0.93)] active:translate-y-2 
                                      active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
                                      active:transition-none">Add details</button>
                                        </div>
                                    </div>
                                </form>
                                )
                            }
                  
                        {/* <form method='POST'onSubmit={submitCompanyDetails}>
                            <h5 className='mx-6 mt-6 font-bold  text-cyan-950'>Contact details</h5>
                            <div className='flex flex-col sm:flex-row justify-start ms-2 pt-2 '>
                            <div className='flex flex-col mx-1'>
                                <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='name'>Phone number</label>
                                <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-cyan-950 rounded ms-2'/>
                            </div>
                            <div className='flex flex-col mx-1'>
                                <label className='text text-sm mt-3 ms-3 text-cyan-950   font-bold' htmlFor='name'>Starting price</label>
                                <input value={startingPrice} onChange={(e)=>setStartingPrice(e.target.value)}  className='placeholder:text-sm w-52  h-10 text-sm focus:outline-none border border-cyan-950 rounded ms-2'/>
                            </div>
                            <div className='flex flex-col mx-1'>
                                
                            <button className="px-10 mt-4 py-4 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-sm transition-all duration-500 ease-linear
                             hover:tracking-widest hover:bg-cyan-950 hover:text-white
                              hover:shadow-lg hover:shadow-[rgba(20,24,54,0.93)] active:translate-y-2 
                              active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
                              active:transition-none">Add details</button>
                                </div>
                            </div>
                        </form> */}
                    
                        </div>
                    </div>
              </div>
          </>

  )
}

export default VendorStoreFront