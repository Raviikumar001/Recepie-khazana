"use client"

import React, { useContext, useEffect, useState } from 'react'
import { SearchIcon,UserAccount } from '../_svgFiles';
import { useUserContext } from '@/app/_contexts/_user_context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type HeaderProps = {
  showSearch :boolean
}


const AppHeader = ({showSearch}:HeaderProps) => {
  const userContext = useUserContext()
  let navigate = useRouter();
  // Check if userContext is not null before destructuring
  const { user, token } = userContext || { user: null, token: null };
  // const user= JSON.parse(localStorage.getItem)
  
  const [loggedUser,setLoggedUser] =useState(user);
  

  function logout()
  {  
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  setTimeout(()=>{
    return navigate.push('/')
  },1200)

  }

  useEffect(()=> {
    setLoggedUser(user)

  },[user])
  console.log(loggedUser, user)



  return (
    <div>
      <div className='border-b-2 border-orange-200  flex justify-between pr-[5%] pl-[5%] mt-3 pb-3 '>
        <div>
          <h2 className='text-red-800 text-xl font-semibold'>
            <Link href="/app"> 
            Recepie Khazana
            </Link>
            </h2>
        </div>
        <div className='flex-header content-center '>
        {showSearch&&  <div className='flex gap-2 cursor-pointer btn-header'>
            <p className='small-text'>
             <Link href='/app/search'> Search Recepies </Link> 
              </p>
            <div>

            <SearchIcon />
            </div>

          </div>}
          {!showSearch&&  <div className='flex gap-2 cursor-pointer btn-header'>
            <p className='small-text font-medium '>
             <Link href='/app/create-recepie'> Create Your Recepie </Link> 
              </p>
            <div>

   
            </div>

          </div>}


          <div className='btn-header small-text cursor-pointer'>
            <p><UserAccount />  {loggedUser?.name}</p> 
          </div>
          <div className='btn-header small-text cursor-pointer' onClick={logout}>
          <p> LOGOUT</p>  
          </div>

        </div>
      </div>

    </div>
  )
}

export default AppHeader