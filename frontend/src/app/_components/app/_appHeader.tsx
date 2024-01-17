"use client"

import React, { useContext } from 'react'
import {SerchIcon} from '../_svgFiles';
import { UserContext } from '@/app/_contexts/_user_context';
const AppHeader = () => {
    const context = useContext(UserContext);

  return (
    <div>
        <div className='border border-b-2 flex justify-between pr-[5%] pl-[5%]'>
            <div>
            <h2 className='text-red-800 text-xl font-semibold'>Recepie Khazana</h2>
            </div>
            <div>

            <SerchIcon />
            <div>
                {}
            </div>
            <div>
               Logout 
            </div>

            </div>
        </div>

    </div>
  )
}

export default AppHeader