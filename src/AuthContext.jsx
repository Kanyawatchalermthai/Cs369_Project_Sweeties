import React, { createContext, useState, useEffect, Children } from 'react';
import axios from 'axios';
import { isAuth } from './libs/isAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAuth(true);
             console.log(isAuth());
        }else{
            setAuth(false);
        }
        // const author = axios.defaults.headers.common["Authorization"];
        // if(author) {
        //     setAuth(true);
        // } else {
        //     setAuth(false);
        //}
    }, []);

    return (
        <AuthContext.Provider value = {{ auth, setAuth}}>
            { auth === null ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export default AuthContext;