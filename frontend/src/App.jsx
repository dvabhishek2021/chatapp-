import React, { Children, useEffect, useState } from 'react'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/loginregister/Auth.jsx'
import Chat from './pages/chat/Chat.jsx'
import Profile from './pages/profile/Profile.jsx'

import { GET_USERINFO } from './utils/constants.js'
// import axios from 'axios'
// import { apiclient } from './lib/api-client.js'


import { useAppStore } from './store';
import { apiclient } from './lib/api-client.js'


const PrivateRoute = ({children})=>{
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const {userInfo,setuserInfo} = useAppStore();
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const getUserData = async () =>{
      try {
        const res = await apiclient.get(GET_USERINFO,{withCredentials:true});

        if(res.status === 200 && res.data){
          setuserInfo(res.data);
        }
        else{
          setuserInfo(undefined);
        }
        console.log({res});
        
      } catch (error) {
        setuserInfo(undefined);
        
      } finally{
        setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }
  },[userInfo,setuserInfo]);

  if(loading){
    return <div>load..</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthRoute>
          <Auth />
        </AuthRoute>} />
        <Route path='/' element={<Navigate to="/auth"/>} />
        <Route path='/chat' element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute>
          <Profile />
        </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
