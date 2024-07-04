import React from "react";
import "./../Style/Header.css";
import logo from "./../Images/logo.gif";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import searchgif from "./../Images/search.gif";
function Header() {
  return (
    <div className="header">
      <Link to="/">
        {" "}
        <img className="header_logo" src={logo} alt="logo" />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text"></input>
        <img className="header_searchIcon" src={searchgif} alt="logo" />
      </div>
      <div className="header_nav">
        <div className="header_options">
          <span className="header_optionLineOne">Heloo </span>
          <span className="header_optionLineTwo">Sign In </span>
        </div>
        <div className="header_options">
          <span className="header_optionLineOne">return </span>
          <span className="header_optionLineTwo">&Order</span>
        </div>
        <div className="header_options">
          <span className="header_optionLineOne">Your </span>
          <span className="header_optionLineTwo">Prime </span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon></ShoppingBasketIcon>
            <span className="header_optionLineTwo header_optionbasketCount">
              0
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
