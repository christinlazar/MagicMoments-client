import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { useLocation } from 'react-router-dom'
import { showPhotosToUser } from '../../api/userApi'
import { createPortal } from 'react-dom'
function Photos() {
const location = useLocation()
const vendorId = location.state
console.log(vendorId)
const [photos,setPhotos] = useState([])
const [modalOpen,setModalOpen] = useState(false)
const [img,setImg] = useState('')
const [isOverlayVisible,setIsOverlayVisisble] = useState(false)

    useEffect(()=>{
        async function photos(){
            const response = await showPhotosToUser(vendorId)
            if(response?.data.success){
                setPhotos(response.data.vendorData.photos)
            }
        }
        photos()
    },[modalOpen,isOverlayVisible])

    const  popUpImage = (photo:string) =>{
        setImg(photo)
        setModalOpen(true)
        setIsOverlayVisisble(true)
    }

    const closeThat = ()=>{
        setImg('')
        setModalOpen(false)
        setIsOverlayVisisble(false)
    }

  return (
    <>
<div className='border border-gray-300 opacity-60'></div>
  
<div className='h-5/6 mt-20'>
      <Toaster richColors position='bottom-right' />
      {isOverlayVisible && (
          <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
        )}
      <div className='xl:flex overflow-x-auto h-full'>
        {photos && photos.map((photo, index) => (
          <div onClick={()=>popUpImage(photo)} key={index} className=' w-full xl:w-1/2 min-w-[200px] mx-2'>
            <div className='grid grid-rows-6 grid-flow-col gap-1 h-[75%] rounded-md'>
              <div className='border row-span-6 col-span-2 text-center overflow-hidden'>
                <img 
                  className="h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" 
                  src={photo} 
                  alt="Vendor photo" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
</div>
{modalOpen && createPortal(
        <div
          className='z-40 h-96 w-96 shadow-2xl border border-gray-500 border-opacity-50 rounded-xl'
          style={{
            color: 'black',
            backgroundColor: 'white',
            paddingBottom: '60px',
            borderRadius: '5px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className='h-96 w-96'>
            <img className='h-full w-full object-cover rounded-md shadow-lg' src={img} alt="Modal Image" />
            <span onClick={closeThat} className='text-xs z-50 text-white hover:cursor-pointer'>
              Close
            </span>
          </div>
        </div>,
        document.body
      )}
</>
  )
}

export default Photos