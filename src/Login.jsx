import React, { useState, useContext } from 'react';
import './index.css';
import AuthContext from './AuthContext';
import axios from 'axios';
import api from './libs/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth', credentials);
            const { token } = response.data;

            if (token) {
                sessionStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuth(true);
                alert('Login successful!');
                navigate('/');
            } else {
                setAuth(false);
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Login attempt failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Log in</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
