import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { apiclient } from '@/lib/api-client';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store'
import { LOGOUT } from '@/utils/constants';
// import { HOST } from '@/utils/constants';
import React from 'react'
import { FiEdit2 } from 'react-icons/fi';
import { IoLogOut } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userInfo,setuserInfo } = useAppStore();
    const Navigate = useNavigate();

    const Logout = async () => {
        try {
            const res = await apiclient.post(LOGOUT,{},{withCredentials:true});
            if(res.status===200){
                Navigate("/auth");
                setuserInfo(null);
            }
        } catch (error) {
           console.log(error);
            
        }
    }


    return (
        <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
            <div className="flex gap-3 items-center justify-center">
                <div className='h-12 w-12 relative'>
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {
                            userInfo.image ? (<AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />) : (
                                <div className={`uppercase h-12 w-12 text-3xl border-[1px] flex  items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                                    {userInfo.firstName ? userInfo.firstName.split("").shift() : userInfo.email.split("").shift()}
                                </div>

                            )}
                    </Avatar>
                </div>
                <div>
                    {
                        userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                    }
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className="text-purple-700 text-xl font-medium" onClick={()=>Navigate("/profile")} />
                        </TooltipTrigger>
                        <TooltipContent >
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoLogOut className="text-white text-xl font-medium" onClick={Logout} />
                        </TooltipTrigger>
                        <TooltipContent >
                            <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default Profile
