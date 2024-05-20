"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTodoContext } from '@/context';

const Userinfo = () => {
  const {logoutUser} = useTodoContext()

    const [token, setToken] = useState("")
    const [user, setUser] = useState({})
    useEffect(() => {

        (async function () {
          const getToken = Cookies.get("token") as string
          setToken(getToken)
    
          // user data 
    
          
          if (getToken) {
            const response = await axios.get('/api/user/getUserInfo')
            setUser(response.data.data)
           
          }
        })()
        
      },[logoutUser])
 return ({user ,token})
}

export default Userinfo