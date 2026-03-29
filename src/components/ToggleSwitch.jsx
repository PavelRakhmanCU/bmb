import React, {useContext} from "react";

import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import { GlobalContext } from "../context/GlobalContext";
const ToggleSwitch = ()=>{
    const {activator, setActivator} = useContext(GlobalContext);

    return(
        <div className={`toggle-switch ${activator ? 'active': ''}`} onClick={() => setActivator(!activator)}>
            {activator ? <RiMenuFold3Fill className="toggle-switch-icon"/> : <RiMenuUnfoldFill className="toggle-switch-icon"/>}
        </div>
    )
}
export default ToggleSwitch;