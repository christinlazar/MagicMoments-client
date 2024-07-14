import React from 'react'
import image1 from '../../assets/pexels-yaroslav-shuraev-4937768.jpg'
import image2 from '../../assets/pexels-yulianaphoto-9197336.jpg'
import image3 from '../../assets/pexels-zvolskiy-1721944.jpg'
import image4 from '../../assets/pexels-andres-alvarez-1800503-3373974.jpg'
import image5 from '../../assets/pexels-nghia-trinh-333496-931796.jpg'
import image6 from '../../assets/pexels-jonathanborba-3062228.jpg'
import magnifier from '../../assets/magnifier.png'
import heart from '../../assets/hearts.png'
import email from '../../assets/email.png'
function Home() {
  const images = [
   image1,
   image2,
   image3,
   image4,
   image5,
   image6
  ];

  return (

    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
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
      <div className='flex items-center justify-center font-montserrat'>
          <h4 className=''>BOOKING YOUR WEDDING PHOTOGRAPHER</h4>
      </div>
      <div className='h-60 mx-4  mb-4 grid grid-cols-3'>
        <div className='bg-white p-4 flex items-center justify-center'>
            <div className='p-2 w-3/4 h-3/4 flex flex-col items-center'>
              <div className='h-20 w-1/4'>
                  <img className='h-full w-full opacity-80' src={magnifier}></img>
              </div>
              <div>
              <p className='font-montserrat font-bold text-xs m-2'>SEARCH</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
              <p className='font-montserrat text-xs m-0 w-1/2 ms-16'>Find Photographers matching your Style & Budget</p>
                </div>
              </div>
            </div>
        </div>
        <div className='bg-white p-4 flex items-center justify-center'>
        <div className='p-2 w-3/4 h-3/4 flex flex-col items-center'>
              <div className='h-20 w-1/4'>
                  <img className='h-full w-full opacity-80' src={heart}></img>
              </div>
              <div>
              <p className='font-montserrat font-bold text-xs m-2'>FAVORITE</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
              <p className='font-montserrat text-xs m-0 w-1/2 ms-16'>Shortlist & compare Photographers you Love</p>
                </div>
              </div>
            </div>
        </div>
        <div className='bg-white p-4 flex items-center justify-center'>
        <div className='p-2 w-3/4 h-3/4 flex flex-col items-center'>
              <div className='h-20 w-1/4'>
                  <img className='h-full w-full opacity-80' src={email}></img>
              </div>
              <div>
              <p className='font-montserrat font-bold text-xs m-2'>CONTACT</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
              <p className='font-montserrat text-xs m-0 w-1/2 ms-16'>Get a quote, check your date and Book direct!</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>


  );
}

export default Home