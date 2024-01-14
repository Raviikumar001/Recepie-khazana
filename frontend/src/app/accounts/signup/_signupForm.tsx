import React from 'react'

const SignupForm = () => {
    return (
        <div>
            <form className='form' >
                <label htmlFor='email' className='lablel-text' >Email</label><br />
                <input name='email' type='text' placeholder='Email' className='input-box '/><br />

                <label htmlFor='password' className='lablel-text' >Password  </label><br />
                <input type='password' name='password' placeholder='Password' className='input-box ' /><br />

                <button className='text-btn' > SIGN IN</button>
                <hr />



            </form>


        </div>
    )
}

export default SignupForm