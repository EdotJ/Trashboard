import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Burger } from "./Burger";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Dropdown } from "antd";
import { useDispatch } from "react-redux";
import { userActions } from "../../actions";
import { history } from "../../helpers";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 700px)").matches
  );
  const [isToggled, setIsToggled] = useState(false);

  function handleSizeChange(e) {
    if (e.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }

  function toggleMenu() {
    setIsToggled(!isToggled);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addEventListener("change21", handleSizeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSizeChange);
    };
  });

  function handleLogout() {
    dispatch(userActions.logout());
    history.push("/");
    localStorage.clear();
  }

  const menu = (
    <Menu className="settings-menu">
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <a className="navbar-logo" href="/">
        Personal dashboard
      </a>
      {!isSmallScreen && (
        <Dropdown overlay={menu} placement="bottomRight">
          <FontAwesomeIcon className="settings-cog" icon={faCog} />
        </Dropdown>
      )}
      {isSmallScreen && <Burger onClick={toggleMenu} />}
      {isSmallScreen && isToggled && (
        <div className={`navbar-links toggled`}>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </div>
      )}
    </nav>
  );
};
