
import { useSelector} from 'react-redux'
import {Navigate,Outlet} from 'react-router-dom'
import VendorNavBar from './vendorNavBar'

interface RootState{
    auth:{
        vendorInfo:string
    }
}

const VendorLoggedIn = () =>{
    const {vendorInfo} = useSelector((state:RootState)=>state.auth)
    return (
            vendorInfo ? <> <VendorNavBar/> <div> <Outlet/> </div> </>: <Navigate to='/vendor/vendorLogin'/>
    )
}

export default VendorLoggedIn