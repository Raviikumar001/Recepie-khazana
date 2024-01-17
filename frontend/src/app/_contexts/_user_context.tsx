"use client"

import React, {createContext, useContext, useState}from 'react'


export const UserContext = createContext(null);

export default function UserContextProvider({children})
{
    const [user,setUser] = useState(localStorage.getItem('user'));
    const [token,setToken] =useState(localStorage.getItem('user'));

    return(
        <UserContext.Provider
        value={{
            user,
            token
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

function useUserContext()
{
    const context = useContext(UserContext);

    if(context === undefined){
        throw new Error(
            "useUserContext must be used within a ThemeContext"
        )
    }
}