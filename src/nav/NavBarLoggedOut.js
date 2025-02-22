import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const LoggedOutNavbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/signup" className="navbar-link">Sign Up</Link>
            </div>
        </nav>
    );
};

export default LoggedOutNavbar;
