"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
const SigninForm = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string>('')

    async function onSubmitForm(e:React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();

        if(!(email || password))
        {
            setMessage('Some Fields are Empty');
            return;
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
            email,
            password
        })

        console.log(response);



    }



    return (
        <div>
            <form className='form' onSubmit={onSubmitForm} >
                <label htmlFor='email' className='lablel-text' >Email</label><br />
                <input name='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type='text' placeholder='Email' className='input-box ' /><br />

                <label htmlFor='password' className='lablel-text' >Password  </label><br />
                <input type='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                name='password' placeholder='Password' className='input-box ' /><br />

                <button type='submit' className='text-btn' > SIGN IN</button>
                {/* <div className='line-break'>

                    <span className='inline-block'>OR</span>
                    
                    


                </div> */}
                <div className="line-break"><span className='p-2'>OR</span></div>
                {/* <button className='google-auth-button' > 
                
                </button> */}
                <button className="google-auth-button flex justify-center items-center">
                    <img className=" w-5 justify-self-start" src="/google.png" alt="g-logo" />
                    <p className="font-medium pl-4">

                    CONTINUE WITH GOOGLE

                    </p>
                </button>







            </form>
            <p className='mt-3'>Don't have an account? {" "}
            <Link href="/accounts/signup" className='font-semibold'>
            Create an account </Link>
            
            </p>


        </div>
    )
}

export default SigninForm