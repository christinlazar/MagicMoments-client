import React,{ useEffect, useRef, useState } from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { Toaster,toast } from 'sonner'
import { addServices } from '../../api/vendorApi'
import useListenMessages from '../../hooks/useListenMessages'
function Services() {

    const [serviceArr,setServiceArr] = useState<any>([])
    
  useListenMessages()

    useEffect(()=>{

    },[])
    const services = [
        " Engagement Shoots","Full-Day Coverage","Drone Photography","Documentary Style","Photo Editing","Online gallery","Photo Albums","video services","Photo booth","custom packages"
       ]

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const response = await addServices(serviceArr)
        if(response?.data.success){
            setServiceArr([])
            toast.success("Services has been added successfully")
        }else{
            setServiceArr([])
            toast.error("Some of the services are already in the service list")
        }
    }

    const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.checked)
        const {value,checked} = e.target
         setServiceArr((prevState:any)=> checked ? [...prevState,value] : prevState.filter((serv:any)=>serv != value))
    }
    console.log(serviceArr)
  return (
    <div className="flex ps-12">
        <Toaster richColors position="bottom-right" />
        <div className='mt-5 hidden md:block '>
        <VendorSidebar/>
        </div>
        <div className="  flex-grow  m-10">  
            <div className='flex'>
            <h2 className='font font-serif text-2xl ms-4 text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold'>Services</h2>
            <i className ="fi fi-rr-customer-service mt-3 ms-3 text-2xl"></i>
            </div>
                  <div className='me-3 p-6'>
            <form onSubmit={handleSubmit}>
                          <p className='text text-slate-900 text-sm mx-3 mt-2'>Showcase your services by adding services to your Storefront.
                            Add unlimited videos related to your business and wedding services.</p>
                         <div className=' h-full border border-purple-300  sm:w-3/4 mt-3 ms-2 flex flex-col items-center justify-around p-4'>
                         <i className ="fi fi-rr-customer-service text-7xl"></i>
                         
                         <div className='flex flex-col justify-between items-start'>
                        {
                            services.map((service,index)=>(
                                <div key={index} className='flex justify-start w-36 mt-3 shadow-xl'>
                                <input onChange={(e)=>handleCheck(e)} className='' type='checkbox' value={service}/>
                                <span className='text-xs ms-6'>{service}</span>
                                </div>
                            ))
                        }
                         </div>
                     
                          <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
                          hover:tracking-widest hover:bg-cyan-950 hover:text-white
                            hover:shadow-lg  hover:shadow-[rgba(24,57,220,0.43)]  active:translate-y-2 
                            active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
                            active:transition-none">Add Services</button>
                    </div>
              </form>
              </div>
              <div>
              </div>
          </div>
    </div>
  )
}

export default Services