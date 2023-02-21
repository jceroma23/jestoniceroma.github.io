import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
const Sidebar = () => {
  return (
    
      <Nav className="flex-column">
        <h5 className="text-muted">Shipment</h5>
        <Link to="/myshipment" className="nav-link">My Shipment</Link>
        <Link to="/shippingsetting" className="nav-link">Shipping Setting</Link>
        <h5 className="text-muted">Order</h5>
        <Link to="/myorders" className="nav-link">My Orders</Link>
        <Link to="/cancellation" className="nav-link">Cancellation</Link>
        <h5 className="text-muted">Product</h5>
        <Link to="/myproducts" className="nav-link">My Products</Link>
        <Link to="/productsAdd" className="nav-link">Add New Product</Link>
      </Nav>

      
    
  );
};

export default Sidebar;