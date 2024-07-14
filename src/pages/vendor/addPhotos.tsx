import React,{useState} from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { addPhotos } from '../../api/vendorApi'
import { Toaster, toast } from 'sonner'
import {useToast} from '@chakra-ui/react'
function AddPhotos() {
  const [photos,setPhotos] = useState<FileList | null>(null)
  const [isUploading,setIsUploading] = useState(false)
      
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log("files is",e.target.files)
        setPhotos(e.target.files)
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(!photos){
      return 
    }
    console.log("photos is",photos)
    const formData = new FormData()
    for (let i = 0; i < photos.length; i++) {
      if(!photos[i].type.startsWith('image/')){
        return toast.error("images files can only be added")
      }
      formData.append('photos', photos[i]);
    }
    
  
    const response = await addPhotos(formData)
    if(response?.data.success){
      toast.success('Images has been added successfully')
    }
  }
  return (
    <>
    <div className="flex ps-12">
      <Toaster richColors position="bottom-right" />
      <div className='mt-5 hidden md:block'>
      <VendorSidebar/>
      </div>
          <div className=" flex-grow ms-6 mt-10">  
            <div className='flex'>
            <h2 className='font font-serif text-2xl ms-4 text-slate-900 shadow-[0_35px_60px_-15px_rgba(168,85,247,0.3)] p-2 font-bold'>Photo Gallery</h2>
            <i className="fi fi fi-rr-camera mt-3 ms-3 text-2xl"></i>
                </div>
                  <div className='me-3'>
                        <form method='POST'  onSubmit={handleSubmit}>
                          <p className='text text-slate-900 text-sm mx-3 mt-2'>Add at least 8 photos highlighting your products or services to give couples a clear picture of your work.
                          Storefronts with more photos typically receive more leads.</p>
                         <div className='h-52 border border-gray-950 w-2/4 mt-3 ms-2 flex flex-col items-center justify-around'>
                         <i className="fi fi-rr-copy-image text-7xl"></i>
                         <input name='photos' onChange={handleImageChange} type='file' multiple className='focus:outline-none border border-purple-200 rounded text-sm w-[90%]'/>
                  <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-cyan-950 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
                   hover:tracking-widest hover:bg-cyan-950 hover:text-white
                    hover:shadow-lg hover:shadow-[rgba(24,57,220,0.43)] active:translate-y-2 
                    active:tracking-widest active:bg-cyan-950 active:text-white active:shadow-none 
                    active:transition-none">Add photos</button>
                    </div>
                    </form>
              </div>
              <div>
              </div>
          </div>
    </div>
</>
  )
}

export default AddPhotos