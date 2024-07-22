import React, { useState ,useEffect} from 'react'
import { profileSubmission } from '../../api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/Store'
import { useNavigate } from 'react-router-dom'
import { userLogOut } from '../../store/slice/AuthSlice'
import { Toaster,toast } from 'sonner'
import SideBar from '../../components/user/SideBar'


function Profile() {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo')
    if(!userInfo){
      dispatch(userLogOut())
    }
  },[dispatch])
  const [content,setContent] = useState<string>('')
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
   e.preventDefault()
    try {
      const res = await profileSubmission(content)
    } catch (error) {
      
    }
  }
  return (
    <div className="flex ps-12">
    <Toaster richColors position="bottom-right" />
        <div className='mt-20 hidden md:block'>
            <SideBar/>
        </div>
</div>
  )
}

export default Profile