import NavBar from './NavBar'
import './index.css'
import { Link } from "react-router-dom";

const ProductBlogs = ({ products }) => {
    return (
            <div className="products-blog">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`}>
                            <img src={`uploads/${product.picture}`} alt={product.productName} className="product-image" />
                            <div className="product-info">
                                <h2 className="product-name">{product.productName}</h2>
                                <p className="product-price">{product.productPrice} ฿</p>
                                {console.log(product.picture)}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
    )
}
export default ProductBlogs;
