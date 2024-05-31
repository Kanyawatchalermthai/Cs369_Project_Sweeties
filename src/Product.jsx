import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAxios from "./libs/useAxios";
import NavBar from "./NavBar";
import "./index.css";

function Product() {
  const { id } = useParams();
  const { data: product, isLoading } = useAxios("/product/" + id);

  return (
    <div className="product-page">
      <NavBar />
      <div className="product-details">
        {isLoading && <div>Loading...</div>}
        {product && (
          <article className="product-article">
            <img
              src={`http://localhost:3000/uploads/${product.picture}`}
              alt={product.productName}
              className="product-detail-image"
            />
            {console.log(product.picture)}
            <div className="product-info">
              <h2 className="product-name">{product.productName}</h2>
              <p className="product-price">
                Price: {product.productPrice} Bath
              </p>
              <p className="product-description">
                {product.productDescription}
              </p>
              <p className="product-size"> {product.type}</p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default Product;
