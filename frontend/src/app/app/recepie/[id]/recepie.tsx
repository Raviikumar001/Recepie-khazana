"use client"
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import AppHeader from '@/app/_components/app/_appHeader';
import RecepiedHeader from '@/app/_components/app/_recepiedHeader';

type RecipeProps= {
    _id: string;
    creator: string;
    recepieId: string;
    title: string;
    description: string;
    ingredients: string;
    recepieSteps: string;
    images: string[];
    __v: number;
  }


const Recepie = () => {

    const [recepie, setRecepie] = useState<RecipeProps>();

    let params = useParams();
    console.log(params)



    const fetchRecepie = async()=>{
        const response  = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-recepieById?id=${params.id}`)
       
        if(response.data)
        {
            setRecepie(response.data.recepie)
        }

    }

    useEffect(()=> {
        fetchRecepie()
    },[])

   

  return (
    <>
        <AppHeader showSearch={true} />
        {recepie && <RecepiedHeader recepie={recepie} />}


    </>
  )
}

export default Recepie