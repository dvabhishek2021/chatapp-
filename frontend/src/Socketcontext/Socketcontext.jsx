import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useEffect, useRef,useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = ()=>{
    return useContext(SocketContext);
};



export const SocketProvider = ({children})=>{
    const socket = useRef();
    const { userInfo } = useAppStore();

    


    useEffect(()=>{
        if(userInfo){
            socket.current = io(HOST,{
                withCredentials:true,
                query:{userId: userInfo.id },
            });
            socket.current.on("connect",()=>{
                console.log("successfully connected to server");
            });

            const handlerecievemsg = (message)=>{
                const { selectedChatData,selectedChatType,addMsg } = useAppStore.getState();
                if(selectedChatType !== undefined && 
                (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id))
                {
                    
                    console.log("message",message);
                    addMsg(message);
                    
                }else{
                    console.log({error});
                    
                }
            };
            
            socket.current.on("recieveMessage",handlerecievemsg);

            return ()=>{
                socket.current.disconnect();
            };
        }
    },[userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
};