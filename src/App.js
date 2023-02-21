import React, { useState, useEffect } from "react";
import { Dropdown } from 'react-bootstrap';
import ProductsDisplay from "./components/productsCrud/productsDisplay";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import LogInForm from "./components/userCrud/login.component";
import SignUpComponent from "./components/userCrud/signup.component";
import { useNavigate } from 'react-router-dom';
import UserDropdown from "./layouts/userDropDown.layout";
import Userdashboard from "./pages/UserDashboard";
import SellerPage from "./pages/sellerPage";
import AddProductForm from "./components/productsCrud/addProducts";
function App() {
//this will set if the user is not log in or login
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
// Add an event listener to listen for changes to the localStorage object
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //   setLoggedIn(!!localStorage.getItem('token'));
  // };
  // window.addEventListener('storage', handleStorageChange);
  // return () => {
  //   window.removeEventListener('storage', handleStorageChange);
  // };
  // }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(user); // check if user is null or the correct value
    if (loggedIn && user) {
      setUserName(JSON.parse(user));
    } else {
      setUserName("");
    }
  }, [loggedIn]);
  console.log(loggedIn);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/', { replace: true });
  };

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };
  
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
        </li>
      </ul>
      {loggedIn ? (
          <UserDropdown userName={userName} handleLogout={handleLogout} />
        ) : (
          <Link className="nav-link text-white" to="/login">Login</Link>
        )}
    </div>

  </div>
  
  <div className="container mt-3">
      <Routes>
        <Route path="/shop" element={<ProductsDisplay />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/sellerPage" element={<SellerPage />} />
        <Route path="/productsAdd" element={<AddProductForm />} />
      </Routes>
      
  </div>
</div>
  );
}
export default App;
