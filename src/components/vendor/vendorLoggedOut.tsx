import { useSelector} from 'react-redux'
import {Navigate,Outlet} from 'react-router-dom'

interface RootState{
    auth:{
        vendorInfo:string
    }
}

const VendorLoggedOut = () =>{
    const {vendorInfo} = useSelector((state:RootState)=>state.auth)
    return (
        vendorInfo ? <Navigate to='/vendor/vendorStore'/> : <Outlet/>
    )
}

export default VendorLoggedOut