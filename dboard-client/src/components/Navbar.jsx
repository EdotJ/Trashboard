import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Burger} from "./Burger";

export const Navbar = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 700px)").matches);
    const [isToggled, setIsToggled] = useState(false);

    function handleSizeChange(e) {
        if (e.matches) {
            setIsSmallScreen(true)
        } else {
            setIsSmallScreen(false);
        }
    }

    function toggleMenu() {
        setIsToggled(!isToggled);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addEventListener("change", handleSizeChange);
        return () => {
            mediaQuery.removeEventListener("change", handleSizeChange);
        }
    });

    return (
        <nav className="navbar">
            <a className="navbar-logo" href="/">Personal dashboard</a>
            {isSmallScreen && <Burger onClick={toggleMenu}/>}
            {isSmallScreen && isToggled &&
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/" className="navbar-link">Home</Link>
            </div>
            }
        </nav>
    )
};