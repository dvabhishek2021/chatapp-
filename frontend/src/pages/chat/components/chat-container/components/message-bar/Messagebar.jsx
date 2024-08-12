import { useSocket } from '@/Socketcontext/Socketcontext.jsx';
import { useAppStore } from '@/store';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';


const Messagebar = () => {
    const emojiRef = useRef();
    const [message,setMessage] = useState("");
    const [emoji,setEmoji] = useState(false);
    const { selectedChatType,selectedChatData,userInfo } = useAppStore();
    const socket = useSocket();

    useEffect(()=>{
        const emojiclose = (event)=>{
            if(emojiRef.current && !emojiRef.current.contains(event.target)){
                setEmoji(false);
            }
        }
        document.addEventListener("mousedown",emojiclose);
        return () => {
            document.removeEventListener("mousedown",emojiclose);   
        };
    },[emojiRef]);

    const handlemoji = (emoji)=>{
        setMessage((message)=>message+emoji.emoji);
    }

    const handleSendMessage = async () => {
        console.log("pahuch rhe ho bhaisahab")
        if(selectedChatType === "contact"){
            socket.emit("sendMessage",{
                sender:userInfo.id,
                content:message,
                recipient:selectedChatData._id,
                messageType:"text",
                fileUrl:undefined
            });
        }
        console.log("jjj");
        
    };


  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6'>
      <div className="flex-1 flex bg-[#282d33] rounded-md items-center gap-5 pr-5">
        <input type='text' placeholder='Enter a message' value={message} onChange={(e)=>setMessage(e.target.value)} 
        className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
            <GrAttachment className='text-2xl'/>
        </button>
        <div className="relative">
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all' 
        onClick={()=>setEmoji(true)}>
            <RiEmojiStickerLine className='text-2xl'/>
        </button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}><EmojiPicker theme='dark' open={emoji} onEmojiClick={handlemoji} autoFocusSearch={false}/></div>
        </div>
      </div>
      <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none
       focus:text-white duration-300 transition-all' onClick={handleSendMessage}>
            <IoSend className='text-2xl'/>
        </button>
    </div>
  )
}

export default Messagebar
