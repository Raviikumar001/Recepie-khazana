"use client"


import React, { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '../_components/app/_appHeader';
import AppRecepieList from '../_components/app/_appRecepieList';
import axios from 'axios';
import RecepieList from '../_components/app/_recepieList';

interface Props {
  name: string,
  email: string,
  registrationDate: string,
  _id?: string
}

const MainApp: React.FC = () => {


  const [user, setUser] = useState<undefined | Props>();
  const [token, settoken] = useState<string | null>();
  const tokenRef = useRef<string | null>();
  const [recepies,setRecepies] = useState([])
  let navigate = useRouter();


  const fetchRecepies = async(user:any)=>
  { 
    console.log(user,"user")
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-recepies?id=${user?._id}`);
    console.log(response);

    if(response.data)
    {  const reversedRecepies = response.data.recepies.reverse();
      setRecepies(reversedRecepies);
    }
  }



  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const user =  localStorage.getItem('user');
      tokenRef.current = token;
      let userobject
      if (user) {
          userobject=JSON.parse(user);
         setUser(JSON.parse(user))

      }
      if (token) {
         settoken(token)
        tokenRef.current = token;
      }
      // console.log(userobject,"ll")
      fetchRecepies(userobject)
      
      
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
   

    setTimeout(() => {

      if (!tokenRef.current) {

        return navigate.push('/')
      }
    }, 600)


  }, []);

  // useEffect(()=> {
   
  //   fetchRecepies()
  // },[])

  // console.log(user)





  return (
    <>
      {user?._id &&
        <>

          <AppHeader showSearch={true} />

          <AppRecepieList />
          <RecepieList RecipeArray={recepies}/>

        </>}

    </>
  )
}

export default MainApp