import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/performances" className="navbar-link">Performances</Link>
                <Link to="/favorites" className="navbar-link">Favorites</Link>
            </div>
        </nav>
    );
};

export default Navbar;