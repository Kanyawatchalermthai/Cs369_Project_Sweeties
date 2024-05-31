import { useState, useContext } from 'react';
import axios from 'axios';
import './index.css';
import api from './libs/api';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [type, setType] = useState('');
    const [newType, setNewType] = useState('');
    const [types, setTypes] = useState(['Cake', 'Cookie', 'Pastry']);
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        type: '',
        image: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        console.log(imgUrl);
        try {
            console.log(product.image);
            await api.post('/products', {
                name: productName,
                image: imgUrl,
                price: productPrice,
                description: productDescription,
                type: type
            });

            navigate('/');

            alert('เพิ่มสินค้าสำเร็จ');
            setProduct({
                productName: '',
                productPrice: '',
                productDescription: '',
                type: '',
                image: null
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setProduct({ ...product, image: e.target.files[0] }); // เก็บไฟล์รูปภาพ
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const upload = async () => {
        try {
            console.log(product.productName);
            const formData = new FormData();
            formData.append("file", product.image);
            console.log(product.image);
            const res = await api.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddType = () => {
        if (newType && !types.includes(newType)) {
            setTypes([...types, newType]);
            setNewType('');
        }
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
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Price:</label>
                        <input
                            type="text"
                            required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Description:</label>
                        <textarea
                            required
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Product Type:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
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
