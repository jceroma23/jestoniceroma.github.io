import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const ProductModal = ({ product, onClose, productId}) => {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, quantity + value));
  };
  // if existing
  const handleAddToCart = (productId, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingCartItem = cartItems.find(item => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cartItems.push({ id: productId, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.reload(false);
    onClose();
  }
  return (
    <Modal show={product !== null} onHide={onClose}>
      <div className="d-flex w-100 h-100">
        <div className="modal-content d-flex w-100 h-100">
          <Modal.Header closeButton>
            <Modal.Title>{product?.productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <img src={product?.imgUrl} alt={product?.productName} />
              <div className="mx-5">
                <p>{product?.description}</p>
                <p>Price: ${product?.price.$numberDecimal}</p>
                <Rating name="read-only" value={product?.rating} readOnly />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6">Quantity:</Typography>
                  <Button variant="contained" onClick={() => handleQuantityChange(-1)}>-</Button>
                  <Typography variant="h6" sx={{ mx: 2 }}>{quantity}</Typography>
                  <Button variant="contained" onClick={() => handleQuantityChange(1)}>+</Button>
                </Box>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleAddToCart(product._id, quantity)}>
              Add to cart
              {/* Need Funtion to trigger */}
            </Button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;