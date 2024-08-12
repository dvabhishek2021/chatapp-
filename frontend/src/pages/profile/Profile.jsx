


import { useAppStore } from '@/store'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { FaPlus,FaTrash } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiclient } from '@/lib/api-client.js';
import { UPDATE_PROFILE } from '@/utils/constants.js';

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo,setuserInfo} = useAppStore();
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [image,setImage] = useState(null);
  const [hovered,setHovered] = useState(false);
  const [selectedColor,setSelectedColor] = useState(0);

  useEffect(()=>{
    if(userInfo.profileSetup == true){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.selectedColor);
    }
  },[userInfo]);

  const validateProfile = async ()=>{
    if(!firstName){
      toast.error("FirsttNmae is required");
      return false;
    }
    if(!lastName){
      toast.error("lastNmae is required");
      return false;
    }
    return true;
  };

  const saveChanges = async ()=>{
    if(validateProfile()){
      try {
        const res = await apiclient.post(UPDATE_PROFILE,{firstName,lastName, color:selectedColor},{withCredentials:true});//
        if(res.status === 200 && res.data){

          setuserInfo({...res.data});
          toast.success("profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  };

  const profilebackarrow = ()=>{
    if(userInfo.profileSetup){
      navigate("/chat");
    }else{
      toast("please complete fields");
    }
  }


  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div onClick={profilebackarrow}>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:h-48 relative flex items-center justify-center' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
            <Avatar className="h-22 w-22 md:w-32 md:h-32 rounded-full overflow-hidden">
              {
                image ? (<AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />) : (
                <div className={`uppercase h-22 w-22 md:w-32 md:h-32 text-5xl border-[1px] flex  items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                </div>
                
              )}
            </Avatar>
            {
              hovered && (
                <div className='absolute inset-0 flex items-center justify-center cursor-pointer ring-fuchsia-50 rounded-full'>
                  {
                    image ? <FaTrash  className='text-white text-3xl cursor-pointer' /> : <FaPlus className='text-white text-3xl cursor-pointer' />
                  }
                </div>
              )
            }

          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input placeholder="email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full'>
              <Input placeholder="FirstName" type="text" value={userInfo.firstName} onChange={e=>setFirstName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full'>
              <Input placeholder="lastname" type="text" value={userInfo.lastName} onChange={e=>setLastName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full flex gap-5'>
              {
                colors.map((color,index)=> (
                  <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white/50 outline-1":""}`} key={index} onClick={()=>setSelectedColor(index)}></div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-14 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
