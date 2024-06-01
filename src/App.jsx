import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useAxios from './libs/useAxios';
import NavBar from './NavBar';
import './index.css';

function App() {
  const { data: products, isLoading } = useAxios('/product');
  const menuRef = useRef(null);

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <NavBar />
      <header className="Header">
        <div className="container-1">
          <h1>Welcome to Sweeties!</h1>
          <p>
            To provide nutritional support for an organism. Food is usually of
            plant, animal, or fungal origin.
          </p>
          <div>
            <button className="order-now-btn" onClick={scrollToMenu}>
              Order Now
            </button>
          </div>
        </div>
        <div className="cake-image-header">
          <img src="/public/Cake2.png" alt="Cake" />
        </div>
      </header>
      <div className="hr"></div>
      <div className="container">
        <p className="menu-title">Available Menu</p>
        <div className="content" ref={menuRef}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            products && (
              <div className="products-blog">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={`uploads/${product.picture}`}
                        alt={product.productName}
                        className="product-image"
                      />
                      <div className="product-info">
                        <h2 className="product-name">{product.productName}</h2>
                        <p className="product-price">{product.productPrice} ฿</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
