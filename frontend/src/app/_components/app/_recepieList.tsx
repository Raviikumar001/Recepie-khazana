import Link from "next/link";
import axios from 'axios';
import { useEffect, useState } from "react";

interface RecipeImage {
  url: string;
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

type RecipeArray = RecipeProps[];

interface RecepieListProps {
  RecipeArray: RecipeArray;

}

const RecepieList: React.FC<RecepieListProps> = ({ RecipeArray }) => {
  const [recepielist, setRecepieList] = useState<RecipeArray>([]);

  async function deleteRecepie(id: any) {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/delete-recepie?id=${id}`);
      // console.log(response);
      if (response.status === 200) {
        let updatedArray = recepielist.filter((item) => item._id !== id);
        
        setRecepieList(updatedArray); // Update local state
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  





    setRecepieList(RecipeArray);
  }, [RecipeArray]);



  return (
    <>
      <div className="flex div-center gap-2 flex-wrap mb-10">
        {recepielist.map((item) => (
          <div key={item._id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow min-h-min">
            <a href="#">
              <img className="rounded-t-lg img-height" src={item.images[0]} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item.title}</h5>
              </a>
            </div>
            <div className="flex justify-between pl-3 pr-3 pb-3 text-blue-500">
              <button>
                <Link href={`/app/edit/${item.recepieId}`}>Edit </Link>
              </button>
              <button onClick={(e) => deleteRecepie(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecepieList;






