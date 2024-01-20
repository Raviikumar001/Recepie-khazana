

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
  
  const RecepieList: React.FC<{ RecipeArray: RecipeArray }> = ({ RecipeArray }) => {
    console.log(RecipeArray)
    return (
      <>
      <div className="flex div-center  gap-2 flex-wrap mb-10">
      {RecipeArray.map((item)=> (
        <>
        <div key={item._id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow min-h-min">
      <a href="#">
        <img className="rounded-t-lg img-height" src={(item.images[0])}  alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{item.title}</h5>
        </a>
       
      </div>
        <div className="flex justify-between pl-3 pr-3 pb-3 text-blue-500">
          <button>Edit</button>
          <button>Delete</button>
        </div>
    </div>


        </>
      )) 

      }

      </div>
  
      </>
    )
  }
  

  export default RecepieList