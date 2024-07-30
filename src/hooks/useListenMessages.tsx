import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/socketContext';
import { Socket } from 'socket.io-client';
import { setMessages } from '../store/slice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: any[];
}

interface RootState {
  auth: {
    conversations: any[];
  };
}

const useListenMessages = () => {
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext); // Correctly use useContext
  const { socket } = socketContext as SocketContextValue; // Type assertion to satisfy TypeScript
  const { conversations } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("reached hereeeee in related with socket.io")
    if (socket) {
      socket.on('newConversation', (conversation: any) => {
        dispatch(setMessages(conversation));
      });

      return () => {
        socket.off('newConversation');
      };
    }
  }, [socket, conversations, dispatch]);

  return null; // This hook does not return any JSX
};

export default useListenMessages;