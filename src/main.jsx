import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Product from './Product.jsx';
import Login from './Login.jsx';
import './index.css';
import AddProduct from './AddProduct.jsx';
import { AuthProvider } from './AuthContext.jsx';
import RequireAuth from './RequireAuth.jsx';

const MainApp = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/addProduct" element={<RequireAuth><AddProduct /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<MainApp />);
