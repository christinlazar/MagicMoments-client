import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { bringvendorUserChat, sendMessageToUser } from '../../api/vendorApi'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../store/slice/AuthSlice'
import useListenMessages from '../../hooks/useListenMessages'
import { Toaster } from 'sonner'
import { setOpenVendorChat } from '../../store/slice/AuthSlice'

interface RootState{
  auth:{
      conversations:[]
  }
}

function SingleVendorChat() {
  const navigate = useNavigate()
  const location = useLocation()
  const {userId,userName} = location.state
  const [message,setmessage] = useState('')
  const [conversations,setConversations] = useState<any>([])
  const dispatch = useDispatch()
  const lastMessageRef = useRef<any>(null)
  const conversationData:any = useSelector((state:RootState)=>state.auth.conversations)
  useListenMessages()
  useEffect(()=>{
    dispatch(setOpenVendorChat(true))
    let isMounted = true
    async function bringuserChat(){
    const response = await bringvendorUserChat(userId)
    if(response?.data.success){
      if(isMounted){
        setConversations(response.data.conversations)
        dispatch(setMessages(response.data.conversations))
      }
    }
    }
    bringuserChat()
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
    },100)
    return ()=>{
      isMounted = false
      dispatch(setOpenVendorChat(false))
    }
  },[setMessages])
  console.log("conv is conv",conversations)
  console.log("veddorcahttrueorfalse",)
  const sendMessage = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setmessage('')
    const response = await sendMessageToUser(conversations._id,userId,message)
    if(response?.data.conversations){
      dispatch(setMessages(response.data.conversations))
    }
  }
  

  console.log("convdata is convdata is",conversationData)
  const formatTime = (date:any) => {
    const dat = new Date(date)
    const hours = String(dat?.getHours()).padStart(2, '0');
    const minutes = String(dat?.getMinutes()).padStart(2, '0'); 
    return `${hours}:${minutes}`; 
  };
  
  return (
  
    <div className="flex flex-col h-screen mb-5 md:flex-row"> 
  <Toaster richColors position='top-center'/>
  
  <div className="w-full md:w-72 bg-gray-200 p-4 md:p-16">
    <div className="mb-2">
      <h2 className="text-sm font-bold text-cyan-800 mt-2">{userName}</h2>
      <p className="text-sm text-gray-900 font-montserrat mt-5">Message ASAP!</p>
    </div>
    <div onClick={() => navigate('/vendor/VendorVideoCall')} className='flex mt-5 hover:cursor-pointer'>
      <i className="fi fi-rr-video-camera-alt text-cyan-800 text-3xl"></i>
      <p className='text-sm text-gray-700 ms-3 mt-1 font-montserrat'>Start call</p>
    </div>
  </div>

  {conversationData && (
    <div className="flex-1 flex flex-col w-full bg-gray-100">
      <div className="flex-1 p-4 overflow-auto">
        <div className="text-center mb-4">
          {/* <h2 className="text-gray-600 font-montserrat text-sm">FEBRUARY 20, 2018</h2> */}
        </div>
        {conversationData.messages?.map((m: any) => (
          <div key={m._id} className={`flex ${m.senderModel === 'Vendor' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div>
            <div ref={lastMessageRef} className={`${m.senderModel === 'Vendor' ? 'bg-cyan-800 text-white' : 'bg-gray-300 text-black'} p-2 rounded-md max-w-xs`}>
              <div className="text-sm font-montserrat">{m.message}</div>
            </div>
            <p className='text-xs p-1'>{formatTime(m.createdAt)}</p>
              </div>
           
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="bg-gray-200 p-2">
        <div className="flex">
          <input 
            value={message} 
            onChange={(e) => setmessage(e.target.value)} 
            type="text" 
            className="flex-1 focus:outline-none p-2 border rounded-md font-montserrat text-sm" 
            placeholder="Type a message..." 
          />
          <button className="ml-2 p-2 w-16 bg-cyan-800 text-white rounded-md flex items-center justify-center">
            <i className="fi fi-rr-paper-plane-top"></i>
          </button>
        </div>
      </form>
    </div>
  )} 
</div>

  )
}

export default SingleVendorChat