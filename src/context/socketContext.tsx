import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

import {jwtDecode} from 'jwt-decode'
interface SocketContextProviderProps {
  children: ReactNode;
}

interface RootState {
  auth: {
    userInfo: string;
  };
}

interface RootState2 {
  auth: {
    vendorInfo: string;
  };
}

interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: any[];
  me:any
}

interface TokenPayload {
    id: string;
    role: string;
  }
  

export const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [me,setMe] = useState<any>()
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { vendorInfo } = useSelector((state: RootState2) => state.auth);

  useEffect(() => {
    if (userInfo || vendorInfo) {
      let verifiedUserInfo:any
      let verifiedVendorInfo:any
      if(userInfo != null){
         verifiedUserInfo = jwtDecode(userInfo as string)
         console.log("verideidUser",verifiedUserInfo)
      }
      if(vendorInfo != null){
         verifiedVendorInfo = jwtDecode(vendorInfo as string )
         console.log("verideidVendor",verifiedVendorInfo)
      }

        const usersId = verifiedUserInfo?.id
        const vendorsId = verifiedVendorInfo?.id

        const sendingId = usersId != null ? usersId : vendorsId
      const socket: Socket = io("https://christin.fun/",{
      // const socket : Socket = io("http://localhost:5000",{
        query:{
            userId:sendingId
        }
      });
      setSocket(socket);

      socket.on("getOnlineUsers",(users)=>{
        setOnlineUsers(users)
      });

      socket.on("me",(id)=>{
        setMe(id)
      })

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo, vendorInfo]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers,me}}>
      {children}
    </SocketContext.Provider>
  );
};

