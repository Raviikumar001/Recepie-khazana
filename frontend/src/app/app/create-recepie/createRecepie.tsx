"use client"

import React, { useState , useEffect} from 'react'
import AppHeader from '@/app/_components/app/_appHeader'
import axios from 'axios';
import { useUserContext } from '@/app/_contexts/_user_context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



type CreateRecepieProps = {
  edit: boolean
}




const CreateRecepie: React.FC<CreateRecepieProps> = ({ edit }) => {
  const [files, setFiles] = useState<File[]>([]);
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

    console.log(recepieDescription, recepieSteps, recepieTitle, ingrediants, recepieSteps)
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
      
      
    });


    formData.append('title', recepieTitle);
    formData.append('description', recepieDescription)
    formData.append('ingrediants', ingrediants)
    formData.append('recepieSteps', recepieSteps)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/create-recepie?id=${user?._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
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



  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("")
        if(message == 'Recipe created successfully'){
          return navigate.push('/app')
        }
      }, 1300);
    }
  }, [message]);


  return (
    <div className='h-screen'>
      <AppHeader showSearch={true} />
      <div className='ml-[5%] mt-5'>
        <h2 className='font-bold text-2xl'>Create Your Recipe</h2>
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





        <label className='label-margin'>Choose file(s)</label>




        <div className='flex gap-2 rounded-r rounded-md mt-3 mb-3'>
          {/* Display image previews */}
          {files.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className='rounded-md img-height'
              // style={{ width: '100px', height: '100px', marginRight: '10px', backgroundSize: 'cover' }}
            />
          ))}
        </div>





        <input
          // onChange={(e) => {
          //   const selectedFiles = e.target.files;
          //   if (selectedFiles) {
          //     setFiles(Array.from(selectedFiles));
          //   }
          // }}
          onChange={handleFileChange}
          type='file'
          multiple
          accept='image/*'
        ></input>
        <br />
        <button type="submit" disabled={disbale} className="disabled:bg-gray-600 inline-flex items-center mt-5 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-md ">
          Creat Recepie
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
export default CreateRecepie