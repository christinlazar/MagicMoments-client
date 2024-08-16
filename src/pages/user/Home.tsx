import React,{useEffect,useState} from 'react'
import image1 from '../../assets/pexels-yaroslav-shuraev-4937768.jpg'
import image2 from '../../assets/pexels-yulianaphoto-9197336.jpg'
import image3 from '../../assets/pexels-zvolskiy-1721944.jpg'
import image4 from '../../assets/pexels-andres-alvarez-1800503-3373974.jpg'
import image5 from '../../assets/pexels-nghia-trinh-333496-931796.jpg'
import image6 from '../../assets/pexels-jonathanborba-3062228.jpg'
import heart from '../../assets/hearts.png'
import email from '../../assets/email.png'
import takeaPhoto from '../../assets/camera (4).png'
// import { getVendors } from '../../api/vendorApi'
import { getVendors } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import useListenMessages from '../../hooks/useListenMessages'
import { Toaster } from 'sonner'
function Home() {
  useListenMessages()
  const [vendors,setVendors] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchVendors = async () =>{
      const response = await getVendors()
      if(response?.data.data){
        setVendors(response.data.data)
      }
    }
    fetchVendors()

  },[])
  const images = [
   image1,
   image2,
   image3,
   image4,
   image5,
   image6
  ];

    const goToSingleVendorView = (vendorId:string) =>{
        navigate('/singleVendorView',{state:vendorId})
    }

  return (
    <>
        
    <div className="min-h-screen pt-20 bg-white  scrollbar-hide overflow-y-auto scroll-smooth">
      <Toaster richColors position='top-center'/>
      <div className="container mx-auto  px-4 py-4">
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <div className="bg-white border rounded overflow-hidden">
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
     
      <div className='flex items-center justify-center font-montserrat p-6'>
          <h4 className='text-xl'>BOOKING YOUR WEDDING PHOTOGRAPHER</h4>
      </div>
      <div className='h-60 mx-4  mb-4 grid grid-cols-3'>
      <div className='bg-white p-4 flex items-center justify-center'>
  <div className='p-2 sm:w-3/4 h-auto flex flex-col items-center'>
    <div className='h-20 w-1/2 sm:w-1/4 hover:cursor-pointer'>
      <img className='h-12 w-12 md:h-16 md:w-16  sm:h-full sm:w-full opacity-80' src={takeaPhoto} alt="Vendors" />
    </div>
    <div onClick={()=>navigate('/servicers')}>
      <p  className='font-montserrat font-bold text-xs m-2 text-center hover:cursor-pointer'>SEE ALL VENDORS</p>
    </div>
    <div className='flex items-center justify-center'>
      <p className='font-montserrat text-xs m-0 w-full sm:w-1/2 sm:ms-16 text-center sm:text-left'>See All Photographers matching your Style & Budget</p>
    </div>
  </div>
</div>

        <div className='bg-white p-4 flex items-center justify-center'>
        <div  onClick={()=>navigate('/wishlist')} className='p-2 sm:w-3/4 h-auto flex flex-col items-center hover:cursor-pointer'>
              <div className='h-20 w-1/2 sm:w-1/4'>
                  <img className='h-12 w-12 md:h-16 md:w-16 sm:h-full sm:w-full opacity-80' src={heart}></img>
              </div>
              <div>
              <p className='font-montserrat font-bold text-xs m-2 text-center'>FAVORITES</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
              <p className='font-montserrat text-xs m-0 w-full sm:w-1/2 sm:ms-16 text-center sm:text-left'>Shortlist & compare Photographers you Love</p>
                </div>
              </div>
            </div>
        </div>
        <div className='bg-white p-4 flex items-center justify-center'>
        <div className='p-2 sm:w-3/4 h-auto flex flex-col items-center'>
              <div className='h-20 w-1/2 sm:w-1/4'>
                  <img className='h-12 w-12 md:h-16 md:w-16  sm:h-full sm:w-full opacity-80' src={email}></img>
              </div>
              <div>
              <p className='font-montserrat font-bold text-xs m-2 text-center'>CONTACT</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
              <p className='font-montserrat text-xs m-0 w-full sm:w-1/2 sm:ms-16 text-center sm:text-left'>Get a quote, check your date and Book direct!</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      {/* <div className='h-96 bg-white mx-4'> */}
        {/* <div className='h-80 max-w-80 bg-black m-2 rounded'>

        </div> */}
      
      {/* </div> */}
  
      <div className='border  border-black border-opacity-50 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory'>
  {
    vendors && vendors.map((vendor:any, index) => vendor.description && vendor.photos.length >= 4 && (
      <div key={index} className="w-72 h-auto rounded-md overflow-hidden shadow my-4 ms-5 flex-shrink-0 hover:drop-shadow-md hover:shadow-2xl snap-start">
        <img className="object-cover p-2 rounded-3xl aspect-[1/1]" src={vendor?.photos[0]} alt="Vendor photo" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 font-montserrat flex justify-center"><p>{vendor?.companyName}</p></div>
          <div>
            {
              vendor && vendor.description ? (
                <p className="text-gray-700 font-montserrat text-sm text-center">
                {vendor?.description.split('').slice(0,100).join('')}...
              </p>
              ) :
              (
                <p className='text-gray-700 font-montserrat text-xs text-center'>Description not added yet</p>
              )
            }
          </div>
        </div>
        <div className='flex justify-center'>
          <i className="fi fi-rr-coins mb-1"></i>
          <span className='text text-xs ms-3'>From Rs.</span>
          <p className='text text-xs  ms-1 text-center font-bold'>{vendor?.startingPrice}</p>
        </div>
        <div className="px-6 pt-2 pb-2 flex justify-center">
          <button onClick={()=>goToSingleVendorView(vendor?._id)} className="inline-block bg-gray-100 rounded-full shadow-xl px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 z-10 hover:cursor-pointer hover:text-slate-900">View Profile</button>
        </div>
      </div>
    ))
  }
</div>



          <div className='bg-black h-60 p-4 flex flex-col items-center m-4'>
              <div>
                  <h1 className='font-montserrat text-gray-300 text-xl mt-10 mb-3'>JOIN OUR WEDDING COMMUNITY TODAY</h1>
              </div>
              <div className=''>
                    <p className='font-montserrat text-gray-300 text-sm'>Be found by couples looking for their perfect wedding photographer, showcase your</p>
                    <p className='ms-0 font-montserrat text-gray-300 text-sm sm:ms-40'>work, enter our awards and features.</p>
              </div>
              <div className='my-8'>
                <button className='border border-gray-300 rounded-md w-36 h-10 font-montserrat text-xs text-slate-300'>
                      SIGN UP
                </button>
              </div>
          </div>
    </div>
    </>

  );
}

export default Home