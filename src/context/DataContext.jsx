import React, { createContext, useContext, useState } from "react";


const Data  = createContext();
export const DataContext = ({children}) =>{
    
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    return(
        <Data.Provider value={{email,setEmail,password,setPassword,confirmPassword, setConfirmPassword}}>
            {children}
        </Data.Provider>
    )
}

export const useData = () =>{
    return useContext(Data)
}