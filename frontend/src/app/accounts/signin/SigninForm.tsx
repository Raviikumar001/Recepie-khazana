"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/_contexts/_user_context';
import { MessageInfo } from '@/app/_components/_Helper_functions';
import Image from 'next/image';

 const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string>('');
    let navigate = useRouter();
    const userContext = useUserContext();

    async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!(email || password)) {
            setMessage('Some Fields are Empty');
            return;
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
            email,
            password
        });

        // console.log(response);
        if(response.data)
        {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setMessage(response.data.message)

        }



    }






    const googleAuth = () => {
        window.open(
            `https://recepie-khazana-production.up.railway.app/v1/auth/google/callback`,
            "_self"
        );
    };

  
    useEffect(() => {
        if (message) {
          setTimeout(() => {
            setMessage("")
            if(message == 'User Authenticated'){
              return navigate.push('/app')
            }
          }, 1000);
        }
      }, [message]);
  


    return (
        <div>
            <form className='form' onSubmit={onSubmitForm}>
            <MessageInfo message={message} />
                <label htmlFor='email' className='lablel-text'>Email</label><br />
                <input name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text' placeholder='Email' className='input-box ' /><br />

                <label htmlFor='password' className='lablel-text'>Password  </label><br />
                <input type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password' placeholder='Password' className='input-box ' /><br />

                <button type='submit' className='text-btn'> SIGN IN</button>
                {/* <div className='line-break'>

                <span className='inline-block'>OR</span>
                
                


            </div> */}
                <div className="line-break"><span className='p-2'>OR</span></div>
                {/* <button className='google-auth-button' >
            
            </button> */}
                <button onClick={googleAuth} className="google-auth-button flex justify-center items-center">
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
    );
};


export default SigninForm