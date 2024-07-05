import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { vendorLogOut } from '../../store/slice/AuthSlice'
import VendorNavBar from '../../components/vendor/vendorNavBar'
import { RootState } from '../../store/Store'


function VendorHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () =>{
          dispatch(vendorLogOut())
          navigate('/vendor/vendorLogin')
    }
    const userInfo = useSelector((state:RootState)=>state.auth)
  return (
    <>
    {/* {
      userInfo && (
        <VendorNavBar/>
      )
    } */}
        {/* <button onClick={logOut} className="button2">
        Logout
        </button> */}
    </>
  )
}

export default VendorHome