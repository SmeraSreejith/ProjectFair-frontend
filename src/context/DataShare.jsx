import React, { createContext, useState } from 'react'


 //create context
 export const addResponseContext= createContext({})

 export const editResponseContext = createContext({})

 
 /* export const sample = createContext({}) */
//children-props 
function DataShare({children}) {
   const [addResponse , setAddResponse] = useState({})
   const [editResponse , setEditResponse] = useState({})

  return (
    //access value of the context
    <addResponseContext.Provider value={{addResponse , setAddResponse}}>
       <editResponseContext.Provider value={{editResponse , setEditResponse}}> 
        {children}
        </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default DataShare