"use client"


import React,{useState,useEffect,useRef} from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '../_components/app/_appHeader';
import AppRecepieList from '../_components/app/_appRecepieList';

interface Props{
    name: string,
    email:string,
    registrationDate:string,
    _id?: string
  } 

const MainApp:React.FC= () => {

    const [user, setUser] = useState<undefined| Props >();
    const [token, settoken] = useState<string|null>();
    const tokenRef = useRef<string| null>();
    let navigate = useRouter();

    const getUser = async () => {
        try {
          const token = await localStorage.getItem('token');
          const user = await localStorage.getItem('user');
          tokenRef.current=token;
          if(user)
          {
           await setUser(JSON.parse(user))
    
          }
          if(token){
            await settoken(token)
            tokenRef.current = token;
          }
          
          
        } catch (error) {
         
        }
      };


      useEffect(() => {

        (function () {
          const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const token = url.searchParams.get('token');
    const user = url.searchParams.get('user'); // This should contain the user JSON string
    
    if (token) {
      // console.log('Token:', token);
    
      if (user) {
        // Decode the user JSON string into a JavaScript object
        const userData = JSON.parse(decodeURIComponent(user));
       
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    
     
    
      // Remove the token and user parameters from the URL
      url.searchParams.delete('token');
      url.searchParams.delete('user');
      url.pathname = '/app';
      window.history.replaceState({}, '', url.toString());
    }
    })();
    
    
    
    
       getUser();
     
       
      setTimeout(()=>{
     
        if(!tokenRef.current){
         
          return navigate.push('/')
         }
       },600)
    
     
      }, []);






  return (
    <>  
    {user?._id &&  
    <>

     <AppHeader showSearch={true}/>
    
    <AppRecepieList />

    </>}

    </>
  )
}

export default MainApp