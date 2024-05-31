import { useState, useContext } from 'react';
import './index.css';
import AuthContext from './AuthContext';
import axios from 'axios';
import api from './libs/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const handleChange = e =>{
        const next = {
            ...form,
            [e.target.name]: e.target.value,
        }
        setForm(next);
       // console.log(next)
        console.log(e.target.name)
        //console.log(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        // Add login logic here
        console.log('Username:', form.username);
        console.log('Password:', form.password);
        try{
            console.log(form.username)
            const res = await api.post(`/auth` , form)
            console.log(res.data.token)
            if (res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
                setAuth(true);
                alert('done!')
                navigate('/')
            } else {
                delete axios.defaults.headers.common["Authorization"];
                setAuth(false);
                alert('Invalid credentials')
            }

        } catch(err){
            alert('Invalid try credentials')
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Log in</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            id="email"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
