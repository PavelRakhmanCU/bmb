import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({route, name, icon})=>{
    return(
        <Link to ={route} className="navlink">
<i className="navlink-icon">{icon}</i>
<span className="navlink-name">{name}</span>

        </Link>
    )
}

export default NavLink;
