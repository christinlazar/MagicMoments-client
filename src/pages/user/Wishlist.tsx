

import React,{useCallback, useEffect, useState} from 'react'
import { fetchPlaces, getVendors, getVendorsFromWishlist, removeVendorWishlist, searchVendor } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoadingFalse, setIsLoadingTrue } from '../../store/slice/AuthSlice';
import { RootState } from '../../store/Store';


enum AcceptanceStatus {
  Requested = 'requested',
  Accepted = 'accepted',
  Rejected = 'rejected'
}
interface Vendor{
  _id:string;
  companyName:string;
  companyEmail:string;
  companyLocation:string;
  password:string;
  createdAt:Date;
  category:string;
  isAccepted:AcceptanceStatus;
  photos:string[];
  videos:string[];
  description:string,
  phoneNumber:string,
  startingPrice:string,
  unAvailableDates:string[],
  services:string[],
  isBlocked:boolean;
  locations:[]
}

const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const  Wishlist:React.FC = () => {
    const [wishlist,setWishlist] = useState<any>([])
    const [refresh,setRefresh] = useState<boolean>(false)

    const navigate = useNavigate()

    const isLoading = useSelector((state:RootState)=>state.auth.isLoading)


    useEffect(()=>{
        const fetchVendors = async () =>{
            const response = await getVendorsFromWishlist()
            if(response?.data.success){
              setWishlist(response.data.wishlist)
            }
          }
          fetchVendors()

          return () =>{
            setRefresh(false)
          }
    },[refresh])
    
    const goToSingleVendorView = (vendorId:string) =>{
        navigate('/singleVendorView',{state:vendorId})
    }

    const removeFromWishlist = async (vendorId:string) =>{

            const response = await removeVendorWishlist(vendorId)
            if(response?.data.success){
                setRefresh(true)
            } 
    }
    
  
  return (
    <>
    <div className='border border-gray-100 mt-20'></div>
    {
      isLoading && (
        <div className='flex items-center justify-center z-40' style={{ color: 'black', padding: '20px', borderRadius: '5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div className="loader">
                    <span className="loader-text text-2xl">Uploading</span>
                    <span className="load"></span>
            </div>
              
          </div>
      )
    }

    <div className="min-h-screen bg-white  border ">
    {/* <div className='pt-20 ps-20'>
        <h1 className='text-xl text-cyan-950 font-montserrat font-bold'>YOUR WISH_LIST</h1>
      </div> */}
      <div className="flex flex-wrap  justify-stretch ms-10 ">
        
        {
        wishlist.length>0 ? wishlist.map((vendor:any, index:number) => (
          <div key={index} className="w-[19%] h-auto overflow-hidden shadow-xl my-4 mx-10 flex-shrink-0 hover:drop-shadow-md hover:shadow-2xl snap-start ">
            <img className="object-cover p-3 rounded-3xl aspect-[1/1]" src={vendor?.photos[0]} alt="Vendor photo" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 font-montserrat flex justify-center">
                <p>{vendor?.companyName}</p>
              </div>
              <div>
                {vendor && vendor.description ? (
                  <p className="text-gray-700 font-montserrat text-sm text-center">
                    {vendor?.description.split('').slice(0, 100).join('')}...
                  </p>
                ) : (
                  <p className='text-gray-700 font-montserrat text-xs text-center'>Description not added yet</p>
                )}
              </div>
            </div>
            <div className='flex justify-center'>
              <i className="fi fi-rr-coins mb-1"></i>
              <span className='text text-xs ms-3'>From Rs.</span>
              <p className='text text-xs ms-1 text-center font-bold'>{vendor?.startingPrice}</p>
            </div>
            <div className="px-6 pt-2 pb-2 flex justify-center">
              <button onClick={() => goToSingleVendorView(vendor?._id)} className="inline-block bg-gray-100 rounded-full shadow-xl px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 z-10 hover:cursor-pointer hover:text-slate-900">
                View Profile
              </button>
            </div>
            <div onClick={()=>removeFromWishlist(vendor?._id)} className='flex justify-center p-4'>
            <span className='className="inline-block bg-red-100 rounded-full shadow-xl px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 z-10 hover:cursor-pointer hover:text-white"'>Remove from wishlist</span>
              </div>  
          </div>
        )):(
            <div  className='flex justify-center items-center p-4 w-full mt-56'>
            <span className='className="inline-block bg-red-100 rounded-full shadow-xl px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 z-10 hover:text-white"'>No wendors in wishlist</span>
              </div> 
        )
    }
      </div>
    </div>
    
    </>
    
  )
}

export default Wishlist