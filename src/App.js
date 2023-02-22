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
import Home from "./pages/home";
import About from "./pages/about";
import { Navbar, Nav, Button } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "./components/cartComponents/cart.component";
import CheckOutPage from "./layouts/checkOutPage";
function App() {
  //CART FuNCTION
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };
//this will set if the user is not log in or login
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
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
    localStorage.removeItem('cartItems');  
    navigate('/', { replace: true });
  };

  
  return (
    //Navigation
    <div className="">
      <div className="container px-4 py-3 " style={{backgroundColor: "#f7cdcf", color: "black"}}>
        <div className="nav container  d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-2" ><img className="logoStrawberryStreet" src="https://scontent.fmnl8-2.fna.fbcdn.net/v/t1.15752-9/332286603_3522202774679554_5782596535844491874_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeEh-RRGG8XcfOxyAPR4Iht1gMRsuymnK3OAxGy7KacrczOcE_-2VJTGPMEvEFYtXDw&_nc_ohc=fzx1YS58-kQAX-P6n3-&_nc_ht=scontent.fmnl8-2.fna&oh=03_AdRZ3E6Kxk_5gdB-fM9hrgL2nSWqxnEuzwkGEXimsBO1Xg&oe=641DD07C" alt="sslogo" /></a>
           
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto" ><img className="textStrawberryStreet" src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t1.15752-9/332538355_586580670004156_5316165726462566570_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFNO8KmvROiD-EbMxjKZJOvZKsQvUOT1AlkqxC9Q5PUCX90I8OJ0Xo8VnNezcnWcjI&_nc_ohc=1da_3GBIc-0AX9nF3mF&tn=fUmH-YQ_Ufh6hXu7&_nc_ht=scontent.fmnl8-3.fna&oh=03_AdSoGuaDvgCM2ufZcHK_K_5fJncxX6uZpmjETUyrI5yu0g&oe=641DCDE4" alt="sstext" /></a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <Link to="/home" className="nav-link text-dark">HOME</Link>
              </li>
              <li>
                <Link to="/shop" className="nav-link text-dark">SHOP</Link>
              </li>
              <li>
                <Link to="/about" className="nav-link text-dark">ABOUT</Link>
              </li>
              <li>
              <Button onClick={handleCartClick}>
              <ShoppingCartIcon />
              </Button>
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
        <Route path="/checkOut" element={<CheckOutPage />} />
        <Route path="/sellerPage" element={<SellerPage />} />
        <Route path="/productsAdd" element={<AddProductForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
  </div>
{/* MODAL */}
  <Cart
        onClose={handleCloseCartModal}
        show={showCartModal}
      />
</div>
  );
}
export default App;
