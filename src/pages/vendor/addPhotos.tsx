import React,{useState} from 'react'
import VendorSidebar from '../../components/vendor/vendorSideNav'
import { addPhotos } from '../../api/vendorApi'

function AddPhotos() {
  const [photos,setPhotos] = useState<FileList | null>(null)

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
      formData.append('photos', photos[i]);
    }
    
    const response = await addPhotos(formData)
  }
  return (
    <>
    <div className="flex ps-12">
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
                         <div className='h-52 border border-purple-300 w-2/4 mt-3 ms-2 flex flex-col items-center justify-around'>
                         <i className="fi fi-rr-copy-image text-7xl"></i>
                         <input name='photos' onChange={handleImageChange} type='file' multiple className='focus:outline-none border border-purple-200 rounded text-sm w-[90%]'/>
                  <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-purple-500 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
                   hover:tracking-widest hover:bg-purple-500 hover:text-white
                    hover:shadow-lg hover:shadow-[rgba(93,24,220,0.5)] active:translate-y-2 
                    active:tracking-widest active:bg-purple-500 active:text-white active:shadow-none 
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