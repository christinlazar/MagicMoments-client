import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { useLocation } from 'react-router-dom'
import { showPhotosToUser } from '../../api/userApi'
import { createPortal } from 'react-dom'
import useListenMessages from '../../hooks/useListenMessages'
function Photos() {
  useListenMessages()

const location = useLocation()
const vendorId = location.state
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
  <div className='border  border-gray-300 opacity-60'></div>
  
  <div className='h-5/6 mt-20'>
    <Toaster richColors position='bottom-right' />
    {isOverlayVisible && (
      <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
    )}
    <div className='flex flex-wrap justify-center overflow-x-auto h-full'>
      {photos && photos.map((photo, index) => (
        <div onClick={() => popUpImage(photo)} key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-w-[200px] mx-2 mb-4'>
          <div className='rounded-md overflow-hidden'>
            <img 
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" 
              src={photo} 
              alt="Vendor photo" 
            />
          </div>
        </div>
      ))}
    </div>
  </div>

  {modalOpen && createPortal(
    <div
      className='z-40 h-[80%] max-w-[90%] shadow-2xl border border-gray-500 border-opacity-50 rounded-xl'
      style={{
        color: 'black',
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className='h-full w-full'>
        <img className='h-full w-full object-cover rounded-md shadow-lg' src={img} alt="Modal Image" />
        <span onClick={closeThat} className='text-xs z-50 text-white hover:cursor-pointer absolute top-2 right-2 bg-black p-1 rounded'>
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