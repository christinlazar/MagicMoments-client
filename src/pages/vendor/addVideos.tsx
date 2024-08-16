import React, { useState } from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { addVideos } from '../../api/vendorApi'
import {toast,Toaster} from 'sonner'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import useListenMessages from '../../hooks/useListenMessages'

interface RootState{
  auth:{
      vendorInfo:string
  }
}
function AddVideos() {
  useListenMessages()
  const [videos,setVideos] = useState<FileList | null>(null)
  const [isOverlayVisible,setIsOverlayVisisble] = useState(false)
  const [isUploading,setIsUploading] = useState(false)
  const vendorInfo = useSelector((state:RootState)=>state.auth)
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log("in handleChange")
    console.log("e.target.flies",e.target.files)
     if(e.target.files){
      setVideos(e.target.files)
     }
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    console.log("in handlesubmit")
    e.preventDefault()
    if(!videos){
      return 
    }
    console.log("videos are--",videos)
    const formData = new FormData()
    for(let i = 0;i<videos.length;i++){
        if(!videos[i].type.startsWith('/video')){
          return toast.error("Videos can only be added")
        }
      formData.append('videos',videos[i])
    }
    setIsUploading(true)
    setIsOverlayVisisble(true)
    const response = await addVideos(formData)
    if(response?.data.success){
      setIsUploading(false)
      setIsOverlayVisisble(false)
      toast.success('Videos has been added successfully')
    }
  }
  return (
    <>
    <div className="flex flex-col md:flex-row ps-4 md:ps-12">
      <Toaster richColors position="bottom-right" />
      {/* VendorSidebar only shown on medium screens and up */}
      <div className="mt-5 hidden md:block">
        <VendorSidebar />
      </div>
      {isOverlayVisible && (
        <div className="absolute inset-0 bg-white opacity-80 z-20"></div>
      )}
      <div className="flex-grow m-6 md:m-10">  
        <div className="flex items-center mb-4">
          <h2 className="font font-serif text-2xl ms-4 text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold">Videos</h2>
          <i className="fi fi-rr-video-camera-alt mt-3 ms-3 text-2xl"></i>
        </div>
        <div className="me-3 p-6">
          <form onSubmit={handleSubmit}>
            <p className="text-slate-900 text-sm mx-3 mt-2">
              Showcase your work by adding videos to your Storefront. Add unlimited videos related to your business and wedding services.
            </p>
            <div className="h-52 border border-purple-300 w-full sm:w-3/4 mt-3 ms-2 flex flex-col items-center justify-around p-4">
              <i className="fi fi-rr-video-camera-alt text-7xl"></i>
              <input onChange={handleFileChange} name='videos' type='file' className='focus:outline-none border border-purple-200 rounded text-sm w-[90%]' />
              <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
                hover:tracking-widest hover:bg-cyan-950 hover:text-white
                hover:shadow-lg hover:shadow-[rgba(24,57,220,0.43)] active:translate-y-2 
                active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
                active:transition-none">Add Videos</button>
            </div>
          </form>
        </div>
        {isUploading && vendorInfo !== null && createPortal(
          <div className='flex items-center justify-center z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5' style={{ color: 'black', borderRadius: '5px' }}>
            <div className="loader">
              <span className="loader-text text-2xl">Uploading</span>
              <span className="load"></span>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  </>
  
  )
}

export default AddVideos