import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const NavLink = ({ route, name, icon }) => {
  const { setActivator } = useContext(GlobalContext);

  return (
    <Link
      to={route}
      className="navlink"
      onClick={() => setActivator(false)}
    >
      <i className="navlink-icon">{icon}</i>
      <span className="navlink-name">{name}</span>
    </Link>
  );
};

export default NavLink;
