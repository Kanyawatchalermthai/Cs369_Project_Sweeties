import React, { useState, useContext } from 'react';
import axios from 'axios';
import './index.css';
import api from './libs/api';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AddProduct = () => {
    const [formState, setFormState] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        type: '',
        image: null
    });

    const [newType, setNewType] = useState('');
    const [types, setTypes] = useState(['Cake', 'Cookie', 'Pastry']);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await uploadImage();
        if (imgUrl) {
            try {
                await api.post('/products', {
                    name: formState.productName,
                    image: imgUrl,
                    price: formState.productPrice,
                    description: formState.productDescription,
                    type: formState.type
                });

                navigate('/');
                alert('Product added successfully');
                resetForm();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormState({
            ...formState,
            [name]: files ? files[0] : value
        });
    };

    const uploadImage = async () => {
        if (formState.image) {
            try {
                const formData = new FormData();
                formData.append("file", formState.image);
                const response = await api.post("/upload", formData);
                return response.data;
            } catch (err) {
                console.error(err);
                return null;
            }
        }
        return null;
    };

    const handleAddType = () => {
        if (newType && !types.includes(newType)) {
            setTypes([...types, newType]);
            setNewType('');
        }
    };

    const resetForm = () => {
        setFormState({
            productName: '',
            productPrice: '',
            productDescription: '',
            type: '',
            image: null
        });
    };

    return (
        <div className="add-product-page">
            <div className="add-product-container">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="productName"
                            required
                            value={formState.productName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Price:</label>
                        <input
                            type="text"
                            name="productPrice"
                            required
                            value={formState.productPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Description:</label>
                        <textarea
                            name="productDescription"
                            required
                            value={formState.productDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Product Type:</label>
                        <select
                            name="type"
                            value={formState.type}
                            onChange={handleChange}
                        >
                            {types.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Add new type"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                        />
                        <button type="button" onClick={handleAddType}>Add Type</button>
                    </div>
                    <div className="form-group">
                        <label>Product Image:</label>
                        <input type="file" accept="image/*" name="image" onChange={handleChange} />
                    </div>
                    <button type="submit" className="add-product-button">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
