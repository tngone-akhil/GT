import React from "react"
import { RootNavigation } from "./src/navigations/RootNavigation"
import { AppThemeProvider } from "./src/context/ThemeContext"
import { DataContext } from "./src/context/DataContext"

export default function App(){
  return(
    <AppThemeProvider>
      <DataContext>
       <RootNavigation/>
       </DataContext>
    </AppThemeProvider>
   
  )
}