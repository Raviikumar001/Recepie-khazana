"use client"

import React, {createContext, useContext, useEffect, useState}from 'react'

type UserContextProviderProps = {
    children: React.ReactNode;
}


type User= {
    name: string,
    email:string,
    registrationDate:string,
    _id: string
  }


type UserContext = {
    user:User| null,
    token:string | null,
    setUser:React.Dispatch<React.SetStateAction<User | null>>,
    setToken:React.Dispatch<React.SetStateAction<string | null>>

}

export const UserContext = createContext<UserContext | null>(null);


export default function UserContextProvider({children}: UserContextProviderProps)
{
    const [user, setUser] = useState<User | null>(null);
    const [token,setToken] =useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
      
        if (userString) {
          const user: User = JSON.parse(userString);
          setToken(token)
          setUser(user);
        }
        
      }, []);
      

    return(
        <UserContext.Provider
        value={{
            user,
            token,
            setUser,
            setToken
            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext()
{
    const context = useContext(UserContext);

    if(!context){
        throw new Error(
            "useUserContext must be used within a ThemeContext"
        )
    }

    return context
}