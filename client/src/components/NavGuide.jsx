import React from "react";
import { NavLink } from "react-router-dom";
import "./NavGuide.css";

const NavGuide = ({ id, icon, label }) => {
  return (
    <NavLink
      to={`/${id}`}
      className={({ isActive }) =>
        isActive ? "nav-guide selected" : "nav-guide"
      }
    >
        <div className="icon">{icon}</div>
        <span className="label">{label}</span>
    </NavLink>
  );
};

export default NavGuide;
