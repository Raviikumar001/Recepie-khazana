import React from 'react'
import Link from 'next/link'

const AppRecepieList: React.FC = () => {
    return (
        <>
            <div
                className='app-recipie-heading'>

                <h2 className='text-center pt-4 text-3xl font-semibold'>Recepies</h2>
            </div>
            <div className='grid'>
                <button className='recepie-btn col-end-7 mr-10'> <Link href='/app/create-recepie'> Create Your Recepie </Link> </button>
            </div>


        </>
    )
}

export default AppRecepieList