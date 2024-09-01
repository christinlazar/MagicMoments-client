import { useEffect, useRef, useState } from 'react';
import { bringchats } from '../../api/vendorApi';
import userImg from '../../assets/user (1).png'
import { useNavigate } from 'react-router-dom';
import {  Toaster } from 'sonner';
const VendorChat = () => {
const [conversations,setConversations] = useState<any>([])
const [users,setUsers] = useState<[]>([])
const visisbiltyRef = useRef<any>(null)
const navigate = useNavigate()
    useEffect(()=>{
        let isMounted = true
        async function bringChats(){
            const response = await bringchats()
         
            if(isMounted){
            setConversations(response?.data.result.conversations)
            setUsers(response?.data.result.users)
            const lm = messages?.map((m:any)=>m[m.length-1]?.message)
            
            }
           
        }
        bringChats()
        return ()=>{
            isMounted = false
        }
    },[])
    
    let messages = conversations.map((conv:any)=>conv?.messages)

    const latestMessages = messages?.map((m:any)=>m[m.length-1]?.message)

  return (
    <section className="container mx-auto p-6 font-mono">
      <Toaster richColors position='bottom-right'/>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead  >
              <tr ref={visisbiltyRef} className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Latest Message</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {
               users && latestMessages? (
                    users.map((u:any,index:number)=>(
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={userImg}
                          alt=""
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                      </div>
                      <div>
                        <p className="hover:cursor-pointer  font-montserrat text-sm text-gray-900">{u?.name}</p>
                      </div>
                    </div>
                  </td>
                  <div className='border flex justify-between pe-10'>
                  <td className="px-2  mt-14 md:py-5 text-md font-montserrat text-sm text-gray-600">{latestMessages[index]}...</td>
                  <div className='flex  flex-col justify-center items-center'>
                  <i className="fi fi-rr-messages   pt-5 text-md text-gray-700 hover:cursor-pointer"></i>
                  <span onClick={()=>navigate('/vendor/vendorSingleChat',{state:{userId:u._id,userName:u.name}})} className='text-xs mb-2 hover:cursor-pointer'>Go to messages</span>
                  </div>
                  </div>
                </tr>
                    ))
                    
                ):(
                  
                  <div className='flex justify-center'>
                  </div>
                )
                }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default VendorChat;