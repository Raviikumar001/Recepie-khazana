"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios, { AxiosError } from 'axios';
import { MessageInfo } from '@/app/_components/_Helper_functions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const SignupForm: React.FC = () => {




    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string>('')
    let navigate = useRouter();

    async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {

        try {
            e.preventDefault();
            if (!(name && email && password && confirmPassword)) {
                setMessage('Fields are Empty')
                return;
            }else if(password !== confirmPassword)
            {
                setMessage('Passwords do not Match');
                return;
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
                name,
                email,
                password
    
            });
    
            // console.log(response, "resonse")
            if (response.data) {
                setMessage(response.data.message)
            }
            
        }
        catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 409) {
              setMessage(err.response.data.message);
            }
          }
           
        
        
        
        // catch (error) {
            
            
        //     if(error.response.status==409)
        //     {
        //         setMessage(error.response.data.message)
        //     }
        // }

    }
    
    
      
    console.log(message)

    const googleAuth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();  // Prevents the default behavior (e.g., form submission)
        e.stopPropagation();
        window.open(
            `https://recepie-3ny9.onrender.com/v1/auth/google/callback`,
            "_self"
        )
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage("");
                if (message == "User Created") {
                    return navigate.push("/accounts/signin");
                }
            }, 2000);
        }
    }, [message]);



    return (
        <div>


            <form className='form' onSubmit={onSubmitForm} >
                <MessageInfo message={message} />
                <label htmlFor='email' className='lablel-text' >Name</label><br />
                <input name='name' value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text' placeholder='Full Name' className='input-box' /><br />

                <label htmlFor='email' className='lablel-text' >Email</label><br />
                <input name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text' placeholder='Email' className='input-box ' /><br />

                <label htmlFor='password' className='lablel-text' >Password  </label><br />
                <input type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password' placeholder='Password' className='input-box ' /><br />

                <label htmlFor='password' className='lablel-text' >Password  </label><br />
                <input type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name='password' placeholder='Confirm Password' className='input-box' /><br />

                <button type='submit' className='text-btn' >SIGN UP</button>
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
            <p className='mt-3 mb-10'>Already have an account? {" "}
                <Link href="/accounts/signin" className='font-semibold'>
                    Sign In</Link>

            </p>


        </div>
    )
}

export default SignupForm