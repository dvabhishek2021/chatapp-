import React from 'react'
import Chathead from './components/chat-header/Chathead'
import Message from './components/message-container/Message'
import Messagebar from './components/message-bar/Messagebar'


const Chatcontainer = () => {
  return (
    <div className='fixed top-0 h-[100vh] w=[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1'>
      <Chathead />
      <Message />
      <Messagebar />
    </div>
  )
}

export default Chatcontainer
