import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { addLongLang } from '../../api/vendorApi';
import { Toaster,toast } from 'sonner';

function AddLocation() {


    const [markerLocation, setMarkerLocation] = useState<google.maps.LatLngLiteral | null>(null);


    const mapStyles = {
        height: "65vh",
        width: "100vw",
    };

    const defaultCenter: google.maps.LatLngLiteral = {
        lat: 10.850516,
        lng: 76.271080,
    };

    const handleMapClick = (event:google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const newMarkerLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            setMarkerLocation(newMarkerLocation);
        }
    };

    const lanLonSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const response = await addLongLang(markerLocation)
        if(response?.data.success){
          toast.success('Location has been added successfully')
        }else if(response?.data.success == false){
          toast.error(`Can't add same location twice`)
        }
        else{
          toast.error('something went wrong')
        }
    }

    console.log("marker location is",markerLocation)
    const gooleMapsApi_Key:string  = process.env.GOOGLE_MAP_API_KEY as string
    return (
        <form onSubmit={lanLonSubmit}>
            {/* <LoadScript googleMapsApiKey = 'AIzaSyCdRUMgE09rO2dkbmmZR_ZVJnS1yJL8oWY '> */}
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                onClick={handleMapClick} 
            >
                {markerLocation && <Marker position={markerLocation} />} 
            </GoogleMap>
        {/* </LoadScript> */}
        <div className='flex justify-center items-center'>

        <Toaster richColors />
        <button className='button  mt-6 h-10 rounded-full text-sm'>
            <span className='font-montserrat text-xs'>Add Location</span>
          </button>


        </div>
        </form>
    
    );
}

export default AddLocation;
