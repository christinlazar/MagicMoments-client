import React, { ReactElement, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socketContext';
import { Socket } from 'socket.io-client';
import { setMessages } from '../store/slice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Toaster,toast } from 'sonner';
import CustomToast from '../customToasts/CustomToast';
interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: any[];
}

interface RootState {
  auth: {
    conversations: any[];
  };
}
interface RootState1 {
    auth: {
      openUserChat: boolean;
    };
  }
  interface RootState2 {
    auth: {
      openVendorChat: boolean;
    };
  }

const useListenMessages = () => {
    const location = useLocation()
    const currentpath = location.pathname
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext); 
  const { socket } = socketContext as SocketContextValue; 
  const { conversations } = useSelector((state: RootState) => state.auth)
  const { openUserChat } = useSelector((state: RootState1) => state.auth);
  const { openVendorChat } = useSelector((state: RootState2) => state.auth);
  ;

  useEffect(() => {
    console.log("reached hereeeee in related with socket.io")
    if (socket) {
      socket.on('newConversation', (conversation:any) => {
        console.log("conversationnnnnnnnnn",conversation)
       console.log(currentpath)
       if(currentpath == '/singleChat' || currentpath == '/vendor/vendorSingleChat'){
        toast.info(`
            Got one message : 
            ${conversation.messages[conversation.messages.length-1].message}
            `)
        // toast.custom(()=>(
        //     <CustomToast/>
        // ))
       }else{
        console.log("here we can add notifications")
       }
        dispatch(setMessages(conversation));
      });

      return () => {
        socket.off('newConversation');
      };
    }
  }, [socket, conversations, dispatch]);

  return null; 
};

export default useListenMessages;