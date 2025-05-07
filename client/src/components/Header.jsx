import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import searchIcon from "../assets/search-icon.svg";
import musicIcon from "../assets/music-icon.svg";
import homeIcon from "../assets/home-icon.svg";
import { Button, RoundButton } from "./Button";

function Header() {
  const navigate = useNavigate(); 
  return (
    <div className="header-container">
      <Link to="/">
        <div className="logo-container">
          <img src={musicIcon} alt="musicLogo" className="music-icon" />
          <div className="logo-text">MusicBud</div>
        </div>
      </Link>

      <div className="middle-container">
        <Link to="/">
          <RoundButton width={40} height={40} contentScale={0.4}>
            <img src={homeIcon} alt="home" className="home-icon" />
          </RoundButton>
        </Link>
        <div className="search-container">
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input
            className="searchBar"
            type="text"
            placeholder="Search Artists, Songs, Albums..."
          />
        </div>
      </div>

      <div className="user-setup-buttons">
        <Button onClick={() => navigate("/userauth/signup")}>Sign Up</Button>
        <Button onClick={() => navigate("/userauth/login")}>Login</Button>
      </div>
    </div>
  );
}

export default Header;
