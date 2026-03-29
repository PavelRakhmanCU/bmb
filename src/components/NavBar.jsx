import React, {useContext} from "react";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegImages } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import NavLink from "./NavLink";
import ToggleSwitch from "./ToggleSwitch";
const NavBar =()=>{
    const {activator}= useContext(GlobalContext);
    const Links=[
    {route:"/", name:"Home", icon:<FaHome />},
    {route:"/about", name:"About Us", icon:<FaInfo/>},
    {route:"/contact", name:"Contact Us", icon:<MdEmail/>},
    {route:"/gallery", name:"Gallery", icon:<FaRegImages/>}
    ]
    return(
        <div className={`navbar ${activator ? 'active': ''}`}>
<ToggleSwitch/>
<ul>
    {Links.map((link,index)=>{
        return <li key={index} style={{"--i":index}}><NavLink route={link.route} name={link.name} icon={link.icon}></NavLink></li>
    })}
</ul>

        </div>
    )
}
export default NavBar;
