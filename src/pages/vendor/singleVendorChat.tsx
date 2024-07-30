import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { bringvendorUserChat, sendMessageToUser } from '../../api/vendorApi'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../store/slice/AuthSlice'
import useListenMessages from '../../hooks/useListenMessages'

interface RootState{
  auth:{
      conversations:[]
  }
}

function SingleVendorChat() {
  const location = useLocation()
  const {userId,userName} = location.state
  const [message,setmessage] = useState('')
  const [conversations,setConversations] = useState<any>([])
  const dispatch = useDispatch()
  const lastMessageRef = useRef<any>(null)
  const conversationData:any = useSelector((state:RootState)=>state.auth.conversations)
  useListenMessages()
  useEffect(()=>{
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
    }
  },[setMessages])
  console.log("conv is conv",conversations)

  const sendMessage = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setmessage('')
    const response = await sendMessageToUser(conversations._id,userId,message)
    if(response?.data.conversations){
      dispatch(setMessages(response.data.conversations))
    }
  }
  

  console.log("convdata is convdata is",conversationData)
  return (
  
    <div className="flex h-screen mb-5">
      {/* Sidebar */}
      <div className="w-72 bg-gray-200 p-16">
  {/* <div className='rounded-full border border-opacity-50 shadow-lg border-gray-200 h-20 w-20 overflow-hidden'>
    <img className='object-cover w-full h-full' src={"dp"} alt="Profile" />
  </div> */}
  <div className="mb-2">
    <h2 className="text-sm font-bold text-cyan-800 mt-2">{userName}</h2>
    <p className="text-sm text-gray-900 font-montserrat">Message ASAP!</p>
  </div>
  {/* <div className='flex'>
  <i className="fi fi-rr-phone-call text-gray-900"></i>
    <p className='text-sm text-gray-900 ms-3 '>{"phoneNumber"}</p>
  </div> */}
</div>

      {/* Chat Window */}
      {
        conversationData && (
          <div className="flex flex-col w-full">
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          {/* Chat Header */}
          <div className="text-center mb-4">
            <h2 className="text-gray-600 font-montserrat text-sm">FEBRUARY 20, 2018</h2>
          </div>

          {/* Messages */}
          {
            conversationData && conversationData?.messages?.map((m:any)=>(
              <div key={m._id} className={`flex ${m.senderModel === 'Vendor' ? 'justify-end' : 'justify-start'} mb-2`}>
          <div ref={lastMessageRef} className={`${m.senderModel === 'Vendor' ? 'bg-cyan-800 text-white' : 'bg-gray-300 text-black'} p-2 rounded-md max-w-xs`}>
            <div className="text-sm">{m.message}</div>
          </div>
        </div>
            ))
          }
        </div>

        {/* Input Box */}
        <form onSubmit={sendMessage}>
        <div className="flex  bg-gray-200">
          <input  value={message} onChange={(e)=> setmessage(e.target.value)} type="text" className="flex-1 focus:outline-none p-2 border rounded-md font-montserrat text-sm" placeholder="Type a message..." />
              <div className='flex'>
              <button className="ml-2 mr-2 p-2 w-16 bg-cyan-800 text-white rounded-md">
              <i className="fi fi-rr-paper-plane-top"></i>
              </button>
                {/* <div className='bg-cyan-800'>

                </div> */}
              </div>
        </div>
        </form>
      </div>
        ) 
      } 
    </div>
  )
}

export default SingleVendorChat