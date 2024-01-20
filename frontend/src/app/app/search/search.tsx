"use client"
import React, { useEffect, useState } from 'react';
import AppHeader from '../../_components/app/_appHeader';
import RecepieList from '@/app/_components/app/_recepieList';
import axios from 'axios';
import { useUserContext } from '../../_contexts/_user_context';

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

const Search: React.FC = () => {
  const { user } = useUserContext();
  const [recepies, setRecepies] = useState<RecipeArray>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [searchedResults, setSearchedResults] = useState<RecipeArray>([]);
  const [loading, setLoading] = useState(true);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>();
  const fetchRecepies = async (userId: string | undefined) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-recepies?id=${userId}`);
      if (response.data) {
        const reversedRecepies = response.data.recepies.reverse();
        setRecepies(reversedRecepies);
        setSearchedResults(reversedRecepies);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setInputSearch(e.target.value);
  
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  
  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, 'i');
    return recepies.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.ingredients)
    );
  };
  
  
  
 

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchRecepies(user._id);
    }
  }, [user]);
  console.log(searchedResults, "search array")
  return (
    <div>
      <AppHeader showSearch={false} />

      <div className='grid justify-items-center mt-[5%]'>
        <input
          value={inputSearch}
          onChange={(e) => handleSearchChange(e)}
          className='seach-input'
          type='text'
          placeholder='Search Recepies...'
        />
      </div>

      { (
        searchedResults.length > 0 && <RecepieList RecipeArray={searchedResults}  />
      )}
    </div>
  );
};

export default Search;

































// "use client"

// import React, { useEffect,useState } from 'react'
// import AppHeader from '../../_components/app/_appHeader';
// import { SearchIcon } from '@/app/_components/_svgFiles';
// import { useUserContext } from '../../_contexts/_user_context';
// import axios from 'axios';
// import RecepieList from '@/app/_components/app/_recepieList';

// interface RecipeImage {
//   url: string;
// }

// interface RecipeProps {
//   _id: string;
//   creator: string;
//   recepieId: string;
//   title: string;
//   description: string;
//   ingredients: string;
//   recepieSteps: string;
//   images: string[];
//   __v: number;
// }
// type RecipeArray = RecipeProps[];







































// const Search = () => {
//   const { user } = useUserContext();
//   const [recepies, setRecepies] = useState<RecipeArray>([]);
//   const [inputSearch, setInputSearch] = useState('');
//   const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>();
//   const [searchedResults, setSearchedResults] = useState<RecipeArray>([]);

//   const fetchRecepies = async (user: any) => {
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-recepies?id=${user?._id}`);
//       console.log(response)
//       if (response.data) {
//         const reversedRecepies = response.data.recepies.reverse();
//         setRecepies(reversedRecepies);
//         setSearchedResults(reversedRecepies);
//       }
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     clearTimeout(searchTimeout);
//     setInputSearch(e.target.value);
//     console.log(inputSearch)

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResult = filterPrompts(e.target.value);
//         setSearchedResults(searchResult);
//       }, 500)
//     );
//   };

//   const filterPrompts = (searchtext: string) => {
//     const regex = new RegExp(searchtext, 'i');
//     return recepies.filter(
//       (item) =>
//         regex.test(item.title) ||
//         regex.test(item.ingredients)
//     );
//   };

//   useEffect(() => {
//     if (user) fetchRecepies(user);
//   }, [user]);

//   return (
//     <div>
//         {/* Your existing components here */}
//         <AppHeader showSearch={false} />

//       <div className='grid justify-items-center mt-[5%]'>
//         <input
//           value={inputSearch}
//           onChange={(e) => handleSearchChange(e)}
//           className='seach-input'
//           type='text'
//           placeholder='Search Recepies...'
//         />
//       </div>

//       {/* Use searchedResults instead of recepies in RecepieList */}
//      { searchedResults?.length>0 &&<RecepieList RecipeArray={searchedResults || []} />}
//     </div>
//   );
// };

// export default Search;










































