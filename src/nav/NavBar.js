import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import { useAuth } from '../auth/AuthContext';
const Navbar = () => {
    const { logout } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/performances" className="navbar-link">Performances</Link>
                <Link to="/favorites" className="navbar-link">Favorites</Link>
                <Link to="#" onClick={logout} className="navbar-link">Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;