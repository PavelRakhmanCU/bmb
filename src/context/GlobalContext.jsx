import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider =(props)=>{
    const [activator, setActivator] = useState(false);
    return(
        <GlobalContext.Provider value={{activator,setActivator}}>{props.children}</GlobalContext.Provider>
    )
}
export default GlobalContextProvider;