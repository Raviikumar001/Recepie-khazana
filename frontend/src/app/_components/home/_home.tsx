import React from 'react'
import HeaderPage from './_headerPage';
import MainSection from './_mainSection';
import Footer from './_Footer';


const HomePage = () => {
  return (
    <div className='h-full'>
     <HeaderPage />
      <MainSection />
      <Footer />
    </div>
  )
}

export default HomePage