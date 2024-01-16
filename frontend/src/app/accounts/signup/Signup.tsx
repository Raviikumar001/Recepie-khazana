import React from 'react'
import SignupForm from './_signupForm'
const SignUp = () => {
    return (
        <div className='grid grid-col-2 grid-flow-col  h-full w-full'>
            <div

                className='min-width: min-content'
                style={{
                    backgroundImage: 'url("/recepie2.jpg")',
                    backgroundSize: 'cover',
                    height: '100vh',
                    width: "100%"
                }}


            >

            </div>
            <div className='account-box'>

                <h1 className='font-semibold text-2xl text-red-800'>Receipe Khazna</h1>
                <h3 className='font-bold text-3xl account-heading'>Sign Up </h3>
                <SignupForm />
            </div>

        </div>
    )
}

export default SignUp