import React from "react";
import ProductsDisplay from "./components/productsCrud/productsDisplay";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import LogInForm from "./components/userCrud/login.component";
import SignUpComponent from "./components/userCrud/signupcomponent";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    //Navigation
    
    <div className="">
      <div className="container px-3 py-2 text-bg-dark">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
        Strawberry Street
      </a>
      <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
        <li>
          <Link to="/" className="nav-link text-secondary">HOME</Link>
        </li>
        <li>
          <Link to="/shop" className="nav-link text-white">SHOP</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link text-white">ABOUT</Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link text-white">CART</Link>
        </li>
        <li>
        <Link to="/login" className="nav-link text-white">LOGIN</Link>
        </li>
      </ul>
    </div>
  </div>
  
  <div className="container mt-3">
      <Routes>
        <Route path="/shop" element={<ProductsDisplay />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/userprofile" element={<UserProfile/>} />
      </Routes>
  </div>
</div>


  
  );
}


export default App;
