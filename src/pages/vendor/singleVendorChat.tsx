import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { bringvendorUserChat } from '../../api/vendorApi'

function SingleVendorChat() {
  const location = useLocation()
  const {userId,userName} = location.state
  const [message,setmessage] = useState('')
  const [conversations,setConversations] = useState<any>([])

  useEffect(()=>{
    async function bringuserChat(){
    const response = await bringvendorUserChat(userId)
    if(response?.data.success){
        setConversations(response.data.conversations)
    }
    }
    bringuserChat()
  },[])
  console.log("conv is conv",conversations)

  const sendMessage = async () =>{
    
  }
  
  return (
  


    <div className="flex h-screen  pb-20">
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
        conversations && (
          <div className="flex flex-col w-full pb-20">
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          {/* Chat Header */}
          <div className="text-center mb-4">
            <h2 className="text-gray-600 font-montserrat text-sm">FEBRUARY 20, 2018</h2>
          </div>

          {/* Messages */}
          {
            conversations?.messages?.map((m:any)=>(
              <div key={m._id} className={`flex ${m.senderModel === 'Vendor' ? 'justify-end' : 'justify-start'} mb-2`}>
          <div className={`${m.senderModel === 'Vendor' ? 'bg-cyan-800 text-white' : 'bg-gray-300 text-black'} p-2 rounded-md max-w-xs`}>
            <div className="text-sm">{m.message}</div>
          </div>
        </div>
            ))
          }
        </div>

        {/* Input Box */}
        <form onSubmit={sendMessage}>
        <div className="flex p-4 bg-gray-200">
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