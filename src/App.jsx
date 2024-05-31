import ProductBlogs from "./ProductBlogs";
import {useRef} from 'react';
import useAxios from "./libs/useAxios";
import NavBar from "./NavBar";
import "./index.css";

function App() {
  const { data: products, isLoading } = useAxios("/product");
  const menuRef = useRef(null);

  const scrollToMenu = () => {
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="App">
      <NavBar />
      <div className="Header">
        <div className="container-1">
          <h1>Welcome to Sweeties!</h1>
          <p>
            To provide nutritional support for an organism. Food is usually of
            plant, animal or fungal origin.
          </p>

          <div className="">
            <button className="order-now-btn" onClick={() => {scrollToMenu()}}>
              Order Now
            </button>
          </div>
        </div>
        <div className="cake-image-header">
        <img src="/public/Cake2.png" alt="Cake" />
        </div>
      </div>
      <div className="hr"></div>
      <div className="container">
        <p className="menu-title">Available Menu</p>
      <div className="content" ref={menuRef}>
        {isLoading && <div>Loading...</div>} {/*โหลดข้อมูลมาก่อน*/}
        {products && <ProductBlogs products={products} />}
        {/* <Catalog /> */}
      </div>
      </div>
    </div>
  );
}

export default App;
