import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { vendorLogOut } from '../../store/slice/AuthSlice'

function VendorHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () =>{
          dispatch(vendorLogOut())
          navigate('/vendor/vendorLogin')
    }
  return (
    <>
        <div>VendorHOme</div>
        <button onClick={logOut} className="button2">
 Logout
</button>

    </>
  )
}

export default VendorHome