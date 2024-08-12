

import { useAppStore } from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Contactcontainer from './components/contact-container/Contactcontainer';
import Emptycontainer from './components/empty-container/Emptycontainer';
import Chatcontainer from './components/chat-container/Chatcontainer';



const Chat = () => {
  const {userInfo,selectedChatType} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("please complete your profile to chat");
      navigate("/profile");
    }
  },[userInfo,navigate]);

  return (
    <div className='flex h-[100vh] text-white'>
      <Contactcontainer />
      {
        selectedChatType === undefined ? <Emptycontainer /> : <Chatcontainer />
      }
      {/* <Emptycontainer /> */}
      {/* <Chatcontainer /> */}
    </div>
  )
}

export default Chat
