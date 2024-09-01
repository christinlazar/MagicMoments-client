import React, { useEffect, useState,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getVendorChat, sendmessage, sendVideoCallReq } from '../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import {  setMessages } from '../../store/slice/AuthSlice';
import useListenMessages from '../../hooks/useListenMessages';
import { setOpenUserChat } from '../../store/slice/AuthSlice';
import { Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
interface RootState{
  auth:{
      conversations:[]
  }
}

const SingleChat = () => {
  const [conv,setConv] = useState<any>([])
  const [message,setmessage] = useState<string>('')
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lastMessageRef = useRef<any>(null)
  useListenMessages();
  const conversationData:any = useSelector((state:RootState)=>state.auth.conversations)

  let {companyName,phoneNumber,dp,vendorId} = location.state

  useEffect(()=>{
    let isMounted = true;
    async function getchat(){
    const response = await getVendorChat(vendorId)
    
    if(response?.data.conversations){
      if(isMounted){
        dispatch(setMessages(response?.data.conversations))
        setConv(response?.data.conversations)
      }
    }
    }
    getchat()
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
    },100)
    dispatch(setOpenUserChat(true))
    return () =>{
      isMounted = false
      dispatch(setOpenUserChat(false))
    }
  },[])

 

  const sendMessage = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const receiverId = conversationData?.participants.find((p:any) => p.participantModel == "Vendor")
    const response = await sendmessage(message,conversationData?._id,'User',receiverId,'Vendor')
    setmessage('')
    if(response?.data.success){
       dispatch(setMessages(response.data.conversations))
       setConv(response.data.conversations)
    }
  }
  const formatTime = (date:any) => {
    const dat = new Date(date)
    const hours = String(dat?.getHours()).padStart(2, '0');
    const minutes = String(dat?.getMinutes()).padStart(2, '0'); 
    return `${hours}:${minutes}`; 
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 px-4 lg:px-11 pb-10">
  <Toaster richColors position='top-center' />
  <div className="w-full lg:w-72 bg-gray-200 p-6 lg:p-16 mb-4 lg:mb-0">
    <div className='rounded-full border border-opacity-50 shadow-lg border-gray-200 h-20 w-20 overflow-hidden mx-auto'>
      <img className='object-cover w-full h-full' src={dp} alt="Profile" />
    </div>
    <div className="mb-2 text-center">
      <h2 className="text-sm font-bold text-cyan-800 mt-2">{companyName}</h2>
      <p className="text-sm text-gray-900 font-montserrat">Message ASAP!</p>
    </div>
    <div className='flex mt-6 justify-center'>
      <i className="fi fi-rr-phone-call text-gray-900"></i>
      <p className='text-sm text-gray-900 ms-3'>{phoneNumber}</p>
    </div>
    <div onClick={() => navigate('/videoCall')} className='flex mt-5 hover:cursor-pointer justify-center'>
      <i className="fi fi-rr-video-camera-alt text-gray-900 text-xl"></i>
      <p className='text-sm text-gray-900 ms-3'>Start a call</p>
    </div>

  </div>

  <div className="flex-1 flex flex-col">
    {conversationData?.messages?.length ? (
      <div className="flex flex-col flex-1 p-4 overflow-auto  bg-gray-100">
        <div className="text-center mb-4">
          {/* <h2 className="text-gray-600 font-montserrat text-sm">{`${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`}</h2> */}
        </div>
        {conversationData.messages.map((m:any) => (
          <div key={m._id} className={`flex  ${m.senderModel === 'User' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div>
            <div ref={lastMessageRef} className={`${m.senderModel === 'User' ? 'bg-cyan-700 text-white' : 'bg-gray-300 text-black'} p-2 rounded-md max-w-xs`}>
              <div className={`chat text-sm`}>{m.message}</div>
            </div>
            <p className='text-xs  p-1'>{formatTime(m.createdAt)}</p>
              </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col flex-1 p-4 overflow-auto bg-gray-100">
        <div className="text-center text-sm mb-4 p-4">
          <h2 className="text-cyan-800 font-montserrat">You haven't sent a message yet!</h2>
          <h2 className="text-cyan-800 font-montserrat">Send a message to start a conversation!</h2>
        </div>
      </div>
    )}
    
    <form onSubmit={sendMessage}>
      <div className="flex pb-2 bg-gray-200 w-full">
        <input value={message} onChange={(e) => setmessage(e.target.value)} type="text" className="flex-1 focus:outline-none p-2 border rounded-md font-montserrat text-sm" placeholder="Type a message..." />
        <button className="ml-2 mr-2 p-2 w-16 bg-cyan-800 text-white rounded-md">
          <i className="fi fi-rr-paper-plane-top"></i>
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default SingleChat