
import { useSelector} from 'react-redux'
import {Navigate,Outlet} from 'react-router-dom'

interface RootState{
    auth:{
        vendorInfo:string
    }
}

const VendorLoggedIn = () =>{
    const {vendorInfo} = useSelector((state:RootState)=>state.auth)
    return (
            vendorInfo ? <Outlet/> : <Navigate to='/vendor/vendorLogin'/>
    )
}

export default VendorLoggedIn