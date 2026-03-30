import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegImages } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import NavLink from "./NavLink";
import ToggleSwitch from "./ToggleSwitch";

const NavBar = () => {
  const { activator, setActivator } = useContext(GlobalContext);
  const location = useLocation();

  const Links = [
    { route: "/", name: "Home", icon: <FaHome /> },
    { route: "/about", name: "About Us", icon: <FaInfo /> },
    { route: "/contact", name: "Contact Us", icon: <MdEmail /> },
    { route: "/gallery", name: "Gallery", icon: <FaRegImages /> },
  ];

  useEffect(() => {
    setActivator(false);
  }, [location.pathname, setActivator]);

  return (
    <div className={`navbar ${activator ? "active" : ""}`}>
      <Link to="/" className="navbar-logo" aria-label="Go to home page">
        Boston Modern Bath
      </Link>
      <ToggleSwitch />
      <ul>
        {Links.map((link, index) => (
          <li key={link.route} style={{ "--i": index }}>
            <NavLink route={link.route} name={link.name} icon={link.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
