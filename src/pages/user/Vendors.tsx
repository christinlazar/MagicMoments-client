

import React,{useCallback, useEffect, useState} from 'react'
import { fetchPlaces, filterByPrice, getVendors, searchVendor } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoadingFalse, setIsLoadingTrue } from '../../store/slice/AuthSlice';
import { RootState } from '../../store/Store';
import { toast, Toaster } from 'sonner';


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

const  Vendors:React.FC = () => {
  const [vendors,setVendors] = useState([])
  const [searchValue,setSearchValue] = useState('')
  const [places,setPlaces] = useState<string[] | any>()
  const [searchResults,setSearchResults] = useState<Vendor[]>([])
  const [refresh,setRefresh] = useState<boolean>(false)
  const [isOverlayVisible,setIsOverlayVisisble] = useState(false)
  const [currentPage,setCurrentpage] = useState<number>(1)
  const [pageRange, setPageRange] = useState<number[]>([1, 2, 3])
  const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoading = useSelector((state:RootState)=>state.auth.isLoading)


    useEffect(()=>{
        const fetchVendors = async () =>{
            const response = await getVendors()
            if(response?.data.data){
              setVendors(response.data.data)
            }
          }
          fetchVendors()
          return setRefresh(false)
    },[refresh])

    const goToSingleVendorView = (vendorId:string) =>{
        navigate('/singleVendorView',{state:vendorId})
    }
    const handleSearch = async () =>{
        dispatch(setIsLoadingTrue())
        setIsOverlayVisisble(true)
        setPlaces([])
        setSearchValue('')
        const response = await searchVendor(searchValue)
        setIsOverlayVisisble(false)
        dispatch(setIsLoadingFalse())
        if(response?.data.success == false){
          setRefresh(true)
          return
        }
        if(response?.data.success){
          setSearchResults(response.data.vendors)
          if(response.data.vendors.length == 0){
            setSearchValue('')
            return
          }
          setPlaces([])
          setVendors(response.data.vendors)
        }
    }
    const debouncedFetchPlaces = useCallback(
      debounce(async (query: string) => {
       const response:any = await fetchPlaces(query);
       setPlaces(response?.data.places)
      }, 300),
      []
    );

    const handleAutoCompAndSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value; 
      setSearchValue(val); 
      debouncedFetchPlaces(val); 
    };

    const vendorsPerPage = 4
    const indexOfLastVendor = currentPage * vendorsPerPage
    const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage 
    const currentVendors = vendors.slice(indexOfFirstVendor,indexOfLastVendor)

    const handlePageChange = (pageNumber:number) =>{
        if(pageNumber > Math.ceil(vendors.length/vendorsPerPage)){
         
          return
        }
        setCurrentpage(pageNumber)
        if(pageNumber > pageRange[0] && pageNumber < vendors.length){
          setPageRange([pageRange[0]+1,pageRange[1]+1,pageRange[2]+1])

        }
        if(pageNumber < pageRange[0] && pageNumber > 0){
          setPageRange([pageRange[0]-1,pageRange[1]-1,pageRange[2]-1])
   
        }
        else{
          return 
        }
    }

    const handlePriceChange = async (e:React.ChangeEvent<HTMLSelectElement>) =>{
      const newValue = e.target.value
        if(newValue.trim() == ''){
          setRefresh(true)
        }
        const response = await filterByPrice(newValue)
        if(response?.data.vendors.length == 0){
          return toast.error('Cant find a vendor')
        }
        if(response?.data.vendors){
          setVendors(response.data.vendors)
        }
    }
    
  return (
    <>
  <div className='border border-gray-100 mt-20'></div>
  {isLoading && (
    <div
      className='flex items-center justify-center z-40'
      style={{
        color: 'black',
        padding: '20px',
        borderRadius: '5px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="loader">
        <span className="loader-text text-2xl">Loading</span>
        <span className="load"></span>
      </div>
    </div>
  )}
  {isOverlayVisible && (
    <div className="absolute inset-0 bg-white opacity-90 z-20"></div>
  )}

  <main className="p-3 mx-4 md:mx-12">
    <Toaster richColors position='bottom-right'/>
    <form className="bg-white p-6 rounded-md">
      <div className="flex items-center border border-cyan-950 rounded-md">
        <div className='ms-2'>
          <i className="fi fi-rr-land-layer-location text-base text-gray-900"></i>
        </div>
        <input
          onChange={handleAutoCompAndSearch}
          value={searchValue}
          className="flex-grow p-2 border-none focus:ring-0 focus:outline-none font-montserrat text-black text-sm"
          placeholder="Enter the location..."
          type="text"
        />
        <div onClick={handleSearch} className='me-4 hover:cursor-pointer'>
          <i className="fi fi-rr-search "></i>
        </div>
      </div>
      {places?.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full md:w-[87%] font-montserrat text-sm bg-white border border-gray-300 rounded-md">
          {places?.map((pl: string, index: number) => (
            <li
              key={index}
              className="p-2 hover:bg-cyan-950 hover:text-white cursor-pointer"
              onClick={() => setSearchValue(pl)}
            >
              {pl}
            </li>
          ))}
        </ul>
      )}
    </form>
  </main>
  <form >
      <div className='flex justify-end mb-5 ms-10 pe-20'>
        <select  onChange={handlePriceChange} className='border border-gray-500 text-xs font-montserrat rounded-full focus:outline-none'>
        <option value="">Select an option</option>
        <option value="10000-50000">10000 - 50000 </option>
        <option value="50000-100000">50000 - 100000</option>
        <option value="above-100000">100000 above</option>
        </select>
      </div>
            </form>

  <div className="min-h-screen bg-white border">
    <div className="flex flex-wrap justify-center md:justify-start px-2 md:px-0">
      {currentVendors.map((vendor: any, index) => vendor.description && vendor.photos.length >= 4 &&   (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto overflow-hidden shadow-xl my-4 flex-shrink-0 hover:drop-shadow-md hover:shadow-2xl snap-start"
        >
          <img
            className="object-cover p-3 rounded-3xl aspect-[1/1]"
            src={vendor?.photos[0]}
            alt="Vendor photo"
          />
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
          <div className='flex justify-center'>
            <i className="fi fi-rr-marker "></i>
            <p className='text text-sm ms-1 text-center'>{vendor?.companyLocation}</p>
          </div>
          <div className="px-6 pt-2 pb-2 flex justify-center">
            <button onClick={() => goToSingleVendorView(vendor?._id)} className="inline-block bg-gray-100 rounded-full shadow-xl px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 z-10 hover:cursor-pointer hover:text-slate-900">
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
<div className="flex justify-center  p-6">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="mx-2 h-10  px-4 py-2 text-xs border font-montserrat rounded-md text-white hover:cursor-pointer bg-cyan-950 hover:bg-cyan-950"
  >
    Previous
  </button>

  {
    pageRange.map((page)=>(
      <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`mx-2 px-4 py-2 text-xs border rounded-full ${page === currentPage ? 'bg-cyan-950 text-white' : 'bg-white hover:bg-gray-100'} text-gray-600`}
    >
      {page}
    </button> 
    ))
  }

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === Math.ceil(vendors.length / vendorsPerPage)}
    className="mx-2 h-10 px-4 text-xs py-2 border rounded-md text-white bg-cyan-950 hover:bg-cyan-950"
  >
    Next
  </button>
</div>
  </div>
   
</>

    
  )
}

export default Vendors