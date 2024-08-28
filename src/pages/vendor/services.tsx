import React,{ useEffect, useRef, useState } from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { Toaster,toast } from 'sonner'
import { addServices, deleteTheService, getVendorData } from '../../api/vendorApi'
import useListenMessages from '../../hooks/useListenMessages'
import { VendorInterface } from '../../interfaces/TypesAndInterfaces'
function Services() {
    const [serviceArr,setServiceArr] = useState<string[]>([])
    const [vendorData,setvendordata] = useState<VendorInterface>()
    const [refresh,setRefresh] = useState<boolean>(false)
  useListenMessages()

    useEffect(()=>{
      const getvendorData = async() =>{
          const response = await getVendorData()
          console.log("vendor",vendorData)
          setvendordata(response?.data.data)
      }
      getvendorData()
      return ()=>{
        setRefresh(false)
      }
    },[refresh])

    const services = [
        " Engagement Shoots","Full-Day Coverage","Drone Photography","Documentary Style","Photo Editing","Online gallery","Photo Albums","video services","Photo booth","custom packages"
       ]

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(serviceArr.length == 0){
          return toast.error("Please select atleast one service")
        }
        const response = await addServices(serviceArr)
        if(response?.data.success){
            setServiceArr([])
            setRefresh(true)
            toast.success("Services has been added successfully")
        }else{
            setServiceArr([])
            toast.error("Some of the services are already in the service list")
        }
    }

    const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) =>{
       
        const {value,checked} = e.target
         setServiceArr((prevState:any)=> checked ? [...prevState,value] : prevState.filter((serv:any)=>serv != value))
    }

    const deleteService = async(service:string) =>{
      const response = await deleteTheService(service)
      if(response?.data.deletedService){
      }
    }
   
  return (
    <div className="flex flex-col md:flex-row ps-4 md:ps-12">
  <Toaster richColors position="bottom-right" />
  <div className="mt-5 hidden md:block">
    <VendorSidebar />
  </div>
  <div className="flex-grow m-10">
    <div className="flex items-center ms-6">
      <h2 className="font-serif text-2xl text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold">
        Services
      </h2>
      <i className="fi fi-rr-customer-service mt-3 ms-3 text-2xl"></i>
    </div>
    <div className="me-3 p-6">
      <form onSubmit={handleSubmit}>
        <p className="text-slate-900 text-sm mx-3 mt-2">
          Showcase your services by adding services to your Storefront. Add unlimited videos related to your business and wedding services.
        </p>
        <div className="h-full border border-purple-300 sm:w-3/4 md:w-1/2 lg:w-2/5 mt-3 ms-2 flex flex-col items-center justify-around p-4">
          <i className="fi fi-rr-customer-service text-7xl"></i>

          <div className="flex flex-col justify-between items-start w-full">
            {services.map((service, index) => (
              <div key={index} className="flex justify-start items-center w-full mt-3 shadow-xl">
                <input onChange={(e) => handleCheck(e)} className="mr-2" type="checkbox" value={service} />
                <span className="text-xs">{service}</span>
              </div>
            ))}
          </div>

          <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
            hover:tracking-widest hover:bg-cyan-950 hover:text-white
            hover:shadow-lg hover:shadow-[rgba(24,57,220,0.43)] active:translate-y-2 
            active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
            active:transition-none w-full sm:w-auto">
            Add Services
          </button>
        </div>
      </form>
      <div className='p-4'>
  <span className='text-md font-montserrat font-bold p-2 block'>Currently providing services</span>
  <ul className='list-disc'>
    {vendorData?.services?.map((service:string) => (
      <li key={service}  className='flex items-center justify-between text-xs p-2 border-b border-gray-200'>
        <span>{service}</span>
        <i onClick={()=>deleteService(service)} className="fi fi-rr-trash hover:cursor-pointer text-red-500 text-base"></i>
      </li>
    ))}
  </ul>
</div>

    </div>
  </div>
</div>

  )
}

export default Services