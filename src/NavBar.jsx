import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const NavBar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="Menu">
            <h1> sweeties </h1>
            <div className="links">
                { isAuthenticated ? (
                    <a onClick={() => handleClick('/addProduct')}>Add Product</a>
                ) : (
                    <a style={{visibility: "hidden"}} onClick={() => handleClick('/addProduct')}>Add Product</a>
                ) }
                <a onClick={() => handleClick('/')}>Home</a>
                { isAuthenticated ? (
                    <a onClick={() => handleLogout()}>Log Out</a>
                ) : (
                    <a onClick={() => handleClick('/login')}>Log In</a>
                ) }
            </div>
        </nav>
    );
}

export default NavBar;
