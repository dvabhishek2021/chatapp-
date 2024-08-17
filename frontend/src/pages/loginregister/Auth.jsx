
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

import { Tabs, TabsList } from '@/components/ui/tabs.jsx'
import { apiclient } from '@/lib/api-client';


import { useAppStore } from '@/store';



import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants.js';
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
    const navigate = useNavigate();
    const { setuserInfo } = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    // const [token, setToken] = useState('');

    const validatelogin = async () => {
        if (!email.length) {
            toast.error("email is required");
            return false;
        }
        if (!password.length) {
            toast.error("password is required");
            return false;
        }

        return true;
    };

    const validatesignup = async () => {
        if (!email.length) {
            toast.error("email is required");
            return false;
        }
        if (!password.length) {
            toast.error("password is required");
            return false;
        }
        if (password != confirmpass) {
            toast.error("password not matched");
            return false;
        }
        return true;
    };

    const login = async () => {
        if (validatelogin()) {

            const res = await apiclient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });

            if (res.data && res.data.user && res.data.user.id) {
                // setToken(res.data.token);
                // localStorage.setItem('token', res.data.token);
                console.log(res.data.user);
                setuserInfo(res.data.user)
                if (res.data.user.profileSetup) {
                    navigate("/chat");
                }
                else {
                    navigate("/profile");
                }
            }
            console.log({ res });

        }
    };

    const signup = async () => {

        if (validatesignup()) {

            const res = await apiclient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
            if (res.status === 201) {
                setuserInfo(res.data.user);
                navigate("/profile");
            }
            console.log({ res });
        };
    };

    // const signup = async ()=>{
    //     if(validatesignup()){
    //       try {
    //         const res = await apiclient.post(SIGNUP_ROUTE, {email, password},{withCredentials:true});//, {withCredentials: true}
    //         if(res.status === 201){
    //           setToken(res.data.token);

    //           setuserInfo(res.data.user); 
    //           navigate("/profile");
    //         }
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    //     }
    //   };



    return (
        <>
            <div className="text-center justify-center flex "><Logo /></div>
            <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                <div className='h-[80vh] bg-white border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
                    <div className='flex flex-col gap-10 items-center justify-center'>
                        <div className='flex items-center justify-center flex-col'>
                            <div className='flex items-center justify-center'>
                                <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
                                <img src="" alt="" />
                            </div>
                            <p className='font-medium text-center'>Fill the details</p>
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <Tabs className='w-3/4' defaultValue='login'>
                                <TabsList className="bg-transparent rounded-none w-full">
                                    <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none
                            w-full data-[state=active]:text-black data-[state=active]:font-semibold
                            data-[state=active]:border-b-purple-500 p-3 translate-all duration-300">Login</TabsTrigger>
                                    <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none
                            w-full data-[state=active]:text-black data-[state=active]:font-semibold
                            data-[state=active]:border-b-purple-500 p-3 translate-all duration-300">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                                    <Input placeholder="email is required" type="email" className="rounder-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Input placeholder="password is required" type="password" className="rounder-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Button className="rounded-full p-6 bg-blue-500" onClick={login}>Login</Button>
                                </TabsContent>
                                <TabsContent className="flex flex-col gap-5 " value="signup">
                                    <Input placeholder="email" type="email" className="rounder-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Input placeholder="password" type="password" className="rounder-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Input placeholder="confirm password" type="password" className="rounder-full p-6" value={confirmpass} onChange={(e) => setConfirmpass(e.target.value)} />
                                    <Button className="rounded-full p-6 bg-blue-500" onClick={signup}>Sign Up</Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className='flex mt-5 justify-center text-center '>
                        <img src="https://img.freepik.com/premium-vector/online-chat-communication-flat-illustration-design_106954-1904.jpg" className='h-[500px]' alt="" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Auth


const Logo = () => {
    return (
      <div className="flex p-5  justify-start items-center gap-2">
        <svg
          id="logo-38"
          width="88"
          height="42"
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
  
