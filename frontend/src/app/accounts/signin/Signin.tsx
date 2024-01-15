import React from 'react'
import SigninForm from './_signinForm'


const SignIn = () => {




  return (
    <div className='grid grid-col-2 grid-flow-col  h-full w-full'>
      <div

      className='min-width: min-content'
      style={{
        backgroundImage: 'url("/recepie1.jpg")',
        backgroundSize: 'cover',
        height: '100vh',
        width: "100%"
      }}


    >
            
      </div>
      <div className='account-box'>

        <h1 className='font-semibold text-2xl text-red-800'>Receipe Khazna</h1>
        <h3 className='font-bold text-3xl account-heading'>Sign in </h3>
        <SigninForm />
      </div>
    
    </div>
  )

}

export default SignIn