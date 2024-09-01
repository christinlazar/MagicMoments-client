
import { createPortal } from 'react-dom'

function LoadingComponent() {
  return (
    <>
    <div className="absolute inset-0 bg-white opacity-80 z-20"></div>
    {
         createPortal(
            <div className='flex items-center justify-center z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5' style={{ color: 'black', borderRadius: '5px' }}>
              <div className="loader">
                <span className="loader-text text-sm font-montserrat  text-gray-500 ">LOADING...</span>
              
              </div>
            </div>,
            
            document.body
          )
    }
   
      </>
  )
}

export default LoadingComponent