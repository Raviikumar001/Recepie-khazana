

import Link from 'next/link'
import React from 'react'

const HeaderPage = () => {
    return (
        <div>
            <section className='flex justify-around mt-7'>

                <div>
                    <h2 className='text-red-800 font-bold text-xl'>
                        <Link href="/">
                            Receipie Khazana
                        </Link></h2>
                </div>
                <div>
                    <ul className='login-list'>
                        <li><Link href="/accounts/signin">  Login</Link></li>
                        <li><Link href="/accounts/signup">Signup </Link></li>

                    </ul>

                </div>

            </section>

        </div>
    )
}

export default HeaderPage