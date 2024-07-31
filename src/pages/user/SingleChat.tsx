import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getVendorChat, sendmessage } from '../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages, setMessages } from '../../store/slice/AuthSlice';
import useListenMessages from '../../hooks/useListenMessages';
import bgImg from '../../assets/d93b9cd13a14f56aca18a42ec13d9981.jpg'
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
  useListenMessages();
  const conversationData:any = useSelector((state:RootState)=>state.auth.conversations)

  let {conversations,companyName,phoneNumber,dp,routeis,vendorId }= location.state

  useEffect(()=>{
    let isMounted = true;
    async function getchat(){
    const response = await getVendorChat(vendorId)
    console.log("ressssss",response);
    
    if(response?.data.conversations){
      if(isMounted){
        dispatch(setMessages(response?.data.conversations))
        setConv(response?.data.conversations)
      }
    }
    }
    getchat()
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
    console.log("res is",response)
    if(response?.data.success){
      console.log(response.data.conversations)
       dispatch(setMessages(response.data.conversations))
       setConv(response.data.conversations)
    }
  }
  console.log("convvv",conv)
  return (
    <div className="flex h-screen pt-20 pe-11 ps-10 pb-10">
      {/* Sidebar */}
      <Toaster richColors position='top-center'/>
      <div className="w-72 bg-gray-200 p-16">
  <div className='rounded-full border border-opacity-50 shadow-lg border-gray-200 h-20 w-20 overflow-hidden'>
    <img className='object-cover w-full h-full' src={dp} alt="Profile" />
  </div>
  <div className="mb-2">
    <h2 className="text-sm font-bold text-cyan-800 mt-2">{companyName}</h2>
    <p className="text-sm text-gray-900 font-montserrat">Message ASAP!</p>
  </div>
  <div className='flex mt-6'>
  <i className="fi fi-rr-phone-call text-gray-900"></i>
  <p className='text-sm text-gray-900 ms-3 '>{phoneNumber}</p>
  </div>
  <div onClick={()=>navigate('/videoCall')} className='flex mt-5 hover:cursor-pointer'>
  <i className ="fi fi-rr-video-camera-alt text-gray-900 text-xl"></i>
  <p className='text-sm text-gray-900 ms-3 '>Go to video call</p>
  </div>
</div>

      {/* Chat Window */}
      {
        conversationData?.messages?.length ? (
          <div className="flex flex-col w-full">
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          {/* Chat Header */}
          <div className="text-center mb-4">
            <h2 className="text-gray-600 font-montserrat text-sm">{`${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`}</h2>
          </div>

          {/* Messages */}
          {
            conversationData.messages.map((m:any)=>(
              <div key={m._id} className={`flex ${m.senderModel === 'User' ? 'justify-end' : 'justify-start'} mb-2`}>
          <div className={`${m.senderModel === 'User' ? 'bg-cyan-700 text-white' : 'bg-gray-300 text-black'} p-2 rounded-md max-w-xs`}>
            <div className="chat text-sm">{m.message}</div>
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

              </div>
        </div>
        </form>
      </div>
        ) : (
          <div className="flex flex-col w-full">
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          {/* Chat Header */}
          <div className="text-center text-sm mb-4 p-4">
            <h2 className="text-cyan-800 font-montserrat">You haven'nt send a message yet !</h2>
            <h2 className="text-cyan-800 font-montserrat">send message to start a conversation!</h2>
          </div>

          {/* Messages */}
            <div key={"1"} >
              <div >
                <div className="text-sm text-gray-500"></div>
                <div></div>
                <div className="text-xs text-gray-400 text-right"></div>
              </div>
            </div>
   
        </div>

        {/* Input Box */}
        <form onSubmit={sendMessage}>
        <div className="flex pb-2 bg-gray-200 w-full">
          <input value={message} onChange={(e)=>setmessage(e.target.value)}  type="text" className="flex-1 focus:outline-none p-2 border rounded-md font-montserrat text-sm" placeholder="Type a message..." />
          <button className="ml-2 mr-2 p-2 w-16 bg-cyan-800 text-white rounded-md">
          <i className="fi fi-rr-paper-plane-top"></i>
          </button>
        </div>
        </form>
      </div>
        )
      }
      
    </div>
  );
};

export default SingleChat