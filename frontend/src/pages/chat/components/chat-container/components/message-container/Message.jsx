import { apiclient } from '@/lib/api-client.js';
import { useAppStore } from '@/store'
import { GET_ALL_MESSAGES, GET_CHANNEL_MESSAGES, HOST } from '@/utils/constants.js';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { MdFolderZip } from "react-icons/md"
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';

const Message = () => {

  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages } = useAppStore();
  const scrollRef = useRef();
  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);



  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiclient.post(GET_ALL_MESSAGES, { id: selectedChatData._id }, { withCredentials: true });
        console.log(res);
        if (res.data.message) {
          setSelectedChatMessages(res.data.message);
        }
      } catch (error) {
        console.log({ error });

      }
    };

    const getChannelMessages = async ()=>{
      try {
        const res = await apiclient.get(`${GET_CHANNEL_MESSAGES}/${selectedChatData._id}`, { withCredentials: true });
        console.log(res);
        if (res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
      } catch (error) {
        console.log({ error });

      }
    };


    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
      else if(selectedChatType === "channel") getChannelMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessage = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {
            showDate && (
              <div className='text-center text-black  my-2'>
                {moment(message.timestamp).format("LL")}
              </div>
            )}

          {selectedChatType === "contact" && renderDMMessage(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}

        </div>
      );
    });
  };

  const downloadFile = async (url) => {
    const res = await apiclient.get(`${HOST}/${url}`, { responseType: "blob" });
    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);

  }

  const renderDMMessage = (message) => (
    <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
      {
        message.messageType === "text" && (
          <div
            className={`${message.sender !== selectedChatData._id
              ? "bg-[#e2e286] text-black rounded"
              : "bg-[white] text-black/80 border-[#ffffff] rounded"
              } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
            {message.content}
          </div>
        )
      }
      {
        message.messageType === "file" && (
          <div
            className={`${message.sender !== selectedChatData._id
              ? "  "
              : "bg-[white] text-black/80 border-[#ffffff] rounded-lg"
              } border inline-block p-1.5 bg-[white] text-black rounded-lg my-1 max-w-[50%] break-words`}>
            {checkIfImage(message.fileUrl) ? (
              <div className='cursor-pointer' onClick={() => {
                setShowImage(true);
                setImageURL(message.fileUrl)
              }}>
                <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} alt="" />
              </div>) : (
              <div className='flex items-center justify-center gap-4 '>
                <span className='text-white text-3xl bg-black/20 rounded-full p-3'>
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span className='bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300' onClick={() => downloadFile(message.fileUrl)}>
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>)
      }
      <div className='text-xs text-black'>
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderChannelMessages = (message) => {
    return (
      <div className={`mt-5 ${message.sender._id !== userInfo.id ? "text-left" : "text-right"}`}>
        {
          message.messageType === "text" && (
            <div
              className={`${message.sender._id === userInfo._id
                ? "bg-[#2b2b29] text-[black]/90 rounded-lg"
                : "bg-[#96ea75] text-black/80 border-[#ffffff] rounded-lg"
                } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
              {message.content}
            </div>
          )
        }

        {
          message.messageType === "file" && (
            <div
              className={`${message.sender !== userInfo._id
                ? " bg-[#e7e77a] text-black border-white "
                : "bg-[#b4f083] text-black/80 border-[#ffffff] rounded-lg"
                } border inline-block p-1 bg-[white] text-black rounded-lg my-1 max-w-[50%] break-words`}>
              {checkIfImage(message.fileUrl) ? (
                <div className='cursor-pointer' onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileUrl)
                }}>
                  <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} alt="" />
                </div>) : (
                <div className='flex items-center justify-center gap-4 '>
                  <span className='text-white text-3xl bg-black/20 rounded-full p-3'>
                    <MdFolderZip />
                  </span>
                  <span>{message.fileUrl.split("/").pop()}</span>
                  <span className='bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300' onClick={() => downloadFile(message.fileUrl)}>
                    <IoMdArrowRoundDown />
                  </span>
                </div>
              )}
            </div>)
        }


        {
          message.sender._id !== userInfo._id ? (<div className='flex items-center justify-start gap-3'>
            <Avatar className="h-8 w-8 rounded-full overflow-hidden">
              {
                message.sender.image && (<AvatarImage src={`${message.sender.image}`} alt="profile" className="object-cover w-full h-full bg-black" />)}
              <AvatarFallback className={`uppercase h-8 w-8 text-lg flex  items-center justify-center rounded-full ${getColor(message.sender.color)}`}>
                {message.sender.firstName ? message.sender.firstName.split("").shift() : message.sender.email.split("").shift()}
              </AvatarFallback>


            </Avatar>
            <span className='text-sm text-black/60'>{`${message.sender.firstName} ${message.sender.lastName}`}</span>
            <span className='text-xs text-black/60'>
              {moment(message.timestamp).format("LT")}
            </span>
          </div>
          ) : (
            <span className='text-xs text-black mt-1'>
              {moment(message.timestamp).format("LT")}
            </span>
          )
        }

      </div>
    )
  }

  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessage()}
      <div ref={scrollRef} />
      {
        showImage && (<div className='fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col'>
          <div>
            <img src={`${HOST}/${imageURL}`} className='h-[80vh] w-full bg-cover' />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button className="bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 
            cursor-pointer transition-all duration-300" onClick={() => downloadFile(imageURL)}>
              <IoMdArrowRoundDown />
            </button>
            <button className="bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 
            cursor-pointer transition-all duration-300" onClick={() => {
                setShowImage(false);
                setImageURL(null);
              }}>
              <IoCloseSharp />
            </button>
          </div>
        </div>
        )}
    </div>
  );
};

export default Message
