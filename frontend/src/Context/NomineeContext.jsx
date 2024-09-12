import {  createContext } from "react";


export const NomineeContext = createContext();

export const NomineeProvider = ({children}) =>{

    const getNominee = () => {

    }


    return (
        <NomineeContext.Provider value={getNominee}>
            {children}
        </NomineeContext.Provider>
    )
}

