import React, { createContext, useContext, useEffect, useState} from "react";
import { retrieveAppTheme } from "../utlis/helpers";

const ThemeContext = createContext();

export const AppThemeProvider = ({children}) =>{
    const [isDarkMode,setIsDarkMode] = useState(false);
    useEffect(()=>{
        retrieveAppTheme(setIsDarkMode)
    },[])

    const theme = isDarkMode ? darkTheme : lightTheme
    return(
    <ThemeContext.Provider value ={{isDarkMode,setIsDarkMode}}>
        {children}
        </ThemeContext.Provider>
    )
}
export const useAppTheme = () => {
  return useContext(ThemeContext);
};


const lightTheme = {
    success: '#10B559',
    error: '#FF472C',
    info: '#eee600 ',
    dark: '#000000',
    light: '#FFFFFF',
    placeholder: '#a8a8a8',
  };
  
  const darkTheme = {
    success: '#10B559',
    error: '#FF472C',
    info: '#eee600 ',
    dark: '#000000',
    light: '#FFFFFF',
    placeholder: '#a8a8a8',
  };
  