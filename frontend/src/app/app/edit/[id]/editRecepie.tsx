"use client"

import React, { useState , useEffect} from 'react'
import AppHeader from '@/app/_components/app/_appHeader'
import axios from 'axios';
import { useUserContext } from '@/app/_contexts/_user_context';
import { useRouter,useParams } from 'next/navigation';





type CreateRecepieProps = {
  edit: boolean
 

}

interface RecipeProps {
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



const EditRecepie:React.FC<CreateRecepieProps>= ({edit }) => {
  
  const [files, setFiles] = useState<File[]>([]);
  let params = useParams();
  const [recepie, setRecepe]=useState<RecipeProps>();
  const [recepieTitle, setRecepieTitle] = useState<string>('');
  const [recepieDescription, setRecepieDescription] = useState<string>('');
  // const [totalTime, setTotalTime] =useState<number>();
  const [ingrediants, setIngredients] = useState('');
  const [recepieSteps, setRecepieSteps] = useState('');

  const userContext = useUserContext();
  const { user } = userContext || { user: null };
  const [disbale, setDisable] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  let navigate = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };




  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisable(true);

    // console.log(recepieDescription, recepieSteps, recepieTitle, ingrediants, recepieSteps)
 
    try {
     
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/update-recepie?id=${recepie?._id}`,
       {
        title: recepieTitle,
        description:recepieDescription,
        ingredients:ingrediants,
        recepieSteps: recepieSteps
        
       }
      );
      console.log(response);
      if(response.status=201)
      {
        setDisable(false);
        setMessage(response.data.message)

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  async function fetchRecepieByid()
  {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-recepieById?id=${params.id}`);
    // console.log(response);
    if(response.data.recepie)
    { setRecepe(response.data.recepie)
      setRecepieTitle(response.data.recepie.title)
      setRecepieDescription(response.data.recepie.description)
      setIngredients(response.data.recepie.ingredients);
      setRecepieSteps(response.data.recepie.recepieSteps)

    }

  }

  useEffect(() => {
    fetchRecepieByid()
    if (message) {
      setTimeout(() => {
        setMessage("")
        if(message == 'Recepie updated succefully'){
          return navigate.push('/app')
        }
      }, 1000);
    }
  }, [message]);
  console.log(params)

  return (
    <div className='h-screen'>
      <AppHeader showSearch={true} />
      <div className='ml-[5%] mt-5'>  
        <h2 className='font-bold text-2xl'>{edit?"Edit":"Create" }Your Recipe</h2>
      </div>

      <form className='ml-[5%] mt-10 h-full' onSubmit={submitForm}>

        <label className='label-margin label-form' >Recipe Title</label>

        <input
          type='text'
          className='input-recepie-form'
          value={recepieTitle}
          onChange={(e) => setRecepieTitle(e.target.value)}
          placeholder='Set Title'
        />

        <label className='label-margin label-form' >Description</label>

        <textarea
          value={recepieDescription}
          onChange={(e) => setRecepieDescription(e.target.value)}
          className='textarea-recepie-form focus:outline-none'
          placeholder='Description'
        />


        {/* 
        <label className='label-margin label-form' >Total Time</label>
        <input
          type='text'
          value={totalTime}
          onChange={(e)=> setTotalTime(Number(e.target.value))}
          className='input-recepie-form'
          placeholder='Description'
        /> */}

        <label className='label-margin label-form' >Ingredients</label>
        <textarea
        
          value={ingrediants}
          onChange={(e) => setIngredients(e.target.value)}
          className='textarea-recepie-form focus:outline-none'
          placeholder='Ingrediants'
        />

        <label className='label-margin label-form '>
          Steps to Make Recepie
        </label>
        <textarea
          value={recepieSteps}
          onChange={(e) => setRecepieSteps(e.target.value)}
          className='textarea-recepie-form focus:outline-none'
          placeholder='Enter the steps'
        />














      
        <br />
        <button type="submit" disabled={disbale} className="disabled:bg-gray-600 inline-flex items-center mt-5 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-md ">
       {edit?"Edit" :  "Create"} Recepie
        </button>

        {message&&<>
          <div className="p-4 mb-4 w-[30%] mt-3 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
  <span className="font-medium">{message}</span> 
</div>
        </>}

       
      </form>
    </div>
  );
};
export default EditRecepie