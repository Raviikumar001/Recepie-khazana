

import Link from 'next/link'
import React from 'react'

const MainSection = () => {
  const recepie_array= [
    {
      src:"/home_receipe1.jpg",
      alt: 'Simple and concise ingrediants'
    },
    {
      src:"/home_receipe2.jpg",
      alt: 'Easy to make '
    },
    {
      src:"/home_receipe3.jpg",
      alt: 'Clear Instructions'
    },
  ]

  return (
    <section className='main-section' >
        
    <div className='text-center mt-[10%]'>
        <h2 className='text-5xl font-semibold'>Receipes for Saviourings</h2>
        <p className='pt-3 text-2xl'>Dive into the world of recepies</p>  

        <button className='get-started-btn'>
          <Link href="/accounts/signup">
          Get Started
          </Link>
          </button>
    </div>

    <div className='receipe-images-home'>
  {recepie_array.map((item) => (
    <div key={item.alt} className='features-container'>
      <div
        className='features-image'
        style={{
          backgroundImage: `url(${item.src})`,
          backgroundSize: 'cover',
          height: '400px',
          width: '55%',
        }}
      ></div>

      <h1 className='top-5 font-medium mt-2'>{item.alt}</h1>
    </div>
  ))}
</div>






    </section>
  )
}

export default MainSection