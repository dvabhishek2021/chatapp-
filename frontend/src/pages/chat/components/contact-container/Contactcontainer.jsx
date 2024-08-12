import React, { useEffect } from 'react'
import Profile from './components/profileinfo/Profile'
import Newmessage from './components/new-message/Newmessage'
import { apiclient } from '@/lib/api-client';
import { GET_DM_CONTACTS } from '@/utils/constants';
import { useAppStore } from '@/store';
import ContactList from '@/components/ContactList';

const Contactcontainer = () => {

  const {setDirectMessagesContacts, directMessagesContacts} = useAppStore();

  useEffect(()=>{
    const getContacts = async ()=>{
      const res = await apiclient.get(GET_DM_CONTACTS,{withCredentials:true});
      if(res.data.contacts){
        setDirectMessagesContacts(res.data.contacts);
      }
    }

    getContacts()
  },[]);

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#080514] border-r-2 w-full'>
      <div className='text-2xl font-bold md:text-4xl text-center pt-3 text-white/90'> LOGO</div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <h6 className='uppercase text-white pl-10 font-light text-opacity-100 text-sm'>chat</h6>
            <Newmessage />
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <h6 className='uppercase text-white pl-10 font-light text-opacity-100 text-sm'>channels</h6>
        </div>
      </div>
      <Profile />
    </div>
  )
}

export default Contactcontainer
