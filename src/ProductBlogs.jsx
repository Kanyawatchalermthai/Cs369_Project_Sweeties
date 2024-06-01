import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`}>
                        <img
                            src={`uploads/${product.picture}`}
                            alt={product.productName}
                            className="product-image"
                        />
                        <div className="product-details">
                            <h2 className="product-title">{product.productName}</h2>
                            <p className="product-price">{product.productPrice} ฿</p>
                            {console.log(product.picture)}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
