import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth } from './libs/isAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
            console.log(isAuth());
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {isAuthenticated === null ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
