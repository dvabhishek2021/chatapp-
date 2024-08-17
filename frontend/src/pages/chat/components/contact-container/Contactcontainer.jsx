import React, { useEffect } from 'react'
import Profile from './components/profileinfo/Profile'
import Newmessage from './components/new-message/Newmessage'
import { apiclient } from '@/lib/api-client';
import { GET_DM_CONTACTS, GET_USER_CHANNELS } from '@/utils/constants';
import { useAppStore } from '@/store';
import ContactList from '@/components/ContactList';
import CreateChannel from './components/create-channel/CreateChannel';

const Contactcontainer = () => {

  const {setDirectMessagesContacts, directMessagesContacts, channels, setChannels} = useAppStore();

  useEffect(()=>{
    const getContacts = async ()=>{
      const res = await apiclient.get(GET_DM_CONTACTS,{withCredentials:true});
      if(res.data.contacts){
        setDirectMessagesContacts(res.data.contacts);
      }
    };

    const getChannels = async ()=>{
      const res = await apiclient.get(GET_USER_CHANNELS,{withCredentials:true});
      if(res.data.channels){
        setChannels(res.data.channels);
      }
    };

    getContacts();
    getChannels();
  },[setChannels,setDirectMessagesContacts]);

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[white] border-r-2 w-full'>
      <div className='text-2xl font-bold md:text-4xl text-center pt-3 text-black'> <Logo /></div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <h6 className='uppercase text-black pl-10 font-semibold text-opacity-100 text-sm'>chat</h6>
            <Newmessage />
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <h6 className='uppercase text-black pl-10 font-semibold text-opacity-100 text-sm'>Create a Groups</h6>
            <CreateChannel />
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts={channels} ischannel={true} />
        </div>
      </div>
      <Profile />
    </div>
  )
}

export default Contactcontainer


const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold ">SyncTalks</span>
    </div>
  );
};


