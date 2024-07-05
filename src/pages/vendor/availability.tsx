import React, { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import "react-multi-date-picker/styles/colors/green.css";
import VendorSidebar from '../../components/vendor/vendorSideNav';

const Availabilty: React.FC = () => {
  const [dates, setDates] = useState<DateObject[]>([]);

  const handleDateChange = (selectedDates: DateObject[]) => {
    setDates(selectedDates);
  };

  return (
    <div className="flex ">
    <div className=' mt-5 hidden md:block'>
    <VendorSidebar  />
    </div>
        <div className="  flex-grow  ">  
          <div>
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-14">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-lg">
        <form>
        <h1 className="text-2xl font-bold mb-4 text-center text-md font-serif">Availability</h1>
        <div className="flex items-center justify-center mb-8">
          <DatePicker
            multiple
            value={dates}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            className=" border mx-auto border-gray-300 rounded-md p-2"
            
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold font-serif mb-2">Selected Dates:</h2>
          <ul className="list-disc list-inside">
            {dates.map((date, index) => (
              <li key={index} className="mb-1">{date.format("DD/MM/YYYY")}</li>
            ))}
          </ul>
        </div>
        <button className="px-4 mt-4 py-2 rounded-full cursor-pointer text-white border-0 bg-purple-500 shadow-md tracking-wider uppercase text-xs transition-all duration-500 ease-linear
                   hover:tracking-widest hover:bg-purple-500 hover:text-white
                    hover:shadow-lg hover:shadow-[rgba(93,24,220,0.5)] active:translate-y-2 
                    active:tracking-widest active:bg-purple-500 active:text-white active:shadow-none 
                    active:transition-none">Add date</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Availabilty;