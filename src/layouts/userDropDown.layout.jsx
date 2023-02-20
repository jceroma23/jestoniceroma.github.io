import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const UserDropdown = ({ userName, handleLogout, isAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);
    //to check if admin or not
    const user = JSON.parse(localStorage.getItem('user'));
    isAdmin = user && user.customerType === 'admin';
        const handleDropdownToggle = () => {
            setIsOpen(!isOpen);
        };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {userName.userName}
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
      <Link to="/userdashboard" className="dropdown-item" onClick={() => setIsOpen(false)}>
          Profile
        </Link>
        <Link to="/purchases" className="dropdown-item" onClick={() => setIsOpen(false)}>
          My Purchases
        </Link>
        {isAdmin ? (
          <Link to="/seller" className="dropdown-item" onClick={() => setIsOpen(false)}>
            Seller Page
          </Link>
        ) : null}
        <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;