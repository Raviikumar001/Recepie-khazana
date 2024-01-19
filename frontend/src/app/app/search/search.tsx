

import React from 'react'
import AppHeader from '../../_components/app/_appHeader';
import { SearchIcon } from '@/app/_components/_svgFiles';

const Search = () => {
  
  return (
    <div>
      <AppHeader showSearch={false} />

      <div className='grid justify-items-center mt-[5%]'>
        <input  className='seach-input' type='text' placeholder='Search Recepies...'  />
      </div>


    </div>
  )
}

export default Search