import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Product from './Product.jsx';
import Login from './Login.jsx';
import './index.css';
import AddProduct from './AddProduct.jsx';
import { AuthProvider} from './AuthContext.jsx';
import RequireAuth from './RequireAuth.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="/product/:id" element={<Product />} />
                {/* <Route path="/addProduct" element={<AddProduct />} /> */}
                <Route path="/addProduct" element={<RequireAuth element={<AddProduct />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);