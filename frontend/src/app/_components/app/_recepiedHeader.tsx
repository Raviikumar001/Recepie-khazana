import React from 'react';
import Image from 'next/image';
type RecipeProps = {
    _id: string;
    creator: string;
    recepieId: string;
    title: string;
    description: string;
    ingredients: string;
    recepieSteps: string;
    images: string[];
    __v: number;
};

type RecepiedHeaderProps = {
    recepie: RecipeProps;
};

const RecepiedHeader: React.FC<RecepiedHeaderProps> = ({ recepie }) => {

    return (
        <>

            <div className='font-Inter'>

                <div className='account-box'>

                    <h1 className='font-semibold text-2xl text-red-800'>{recepie.title}</h1>


                </div>

                <div className="flex div-center gap-2 flex-wrap mb-5">
                    {recepie.images.map((item, index) => (
                        <div key={index} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow min-h-min">

                            <img className="rounded-t-lg img-height" src={item} alt="" />


                        </div>
                    ))}
                </div>
              
                <div className='pl-[5rem] w-[70%] mb-10' style={{ width: '80rem' }}>
                    <small className='text-lg font-medium'>Description</small>
                    <div className='description-container'>
                        <div className='text-lg w-[70%] white-space-pre-wrap'>
                            {recepie.description}
                            
                            </div>
                    </div>

                    <h2 className='mt-5 text-lg font-medium'>Ingredients</h2>
                    <div className='ingredients-container'>
                        <div className='white-space-pre-wrap'>{recepie.ingredients}</div>
                    </div>

                    <h2 className='mt-5 text-lg font-medium'>How To(Steps)</h2>
                    <div className='steps-container'>
                        <div className='white-space-pre-wrap'>{recepie.recepieSteps}</div>
                    </div>
                </div>





            </div>
        </>
    );
};

export default RecepiedHeader;
