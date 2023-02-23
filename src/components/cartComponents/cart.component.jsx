
import '../../assets/style/products.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProductDataService from '../../service/service';
import { useNavigate } from 'react-router-dom';
const CartModal = ({ onClose, show }) => {
  //cart
  const [cartItems, setcartItems] = useState([]);
  // const [userId, setUserId] = useState(localStorage.getItem('user')?.id);
  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     setUserId(user?.id);
  //   });
  //   window.addEventListener('storage', handleStorageChange);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setcartItems(items);
  }, []);

  const updateCart = (items) => {
    setcartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };
  const removeItem = (item) => {
    const newItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    updateCart(newItems);
  };
  const [productMap, setProductMap] = useState({});
  useEffect(() => {
    const ids = cartItems.map((item) => item.id);
    const promises = ids.map((id) => ProductDataService.get(id));
    Promise.all(promises)
      .then((responses) => {
        const productMap = {};
        responses.forEach((response) => {
          productMap[response.data._id] = response.data;
        });
        console.log('productMap:', productMap);
        setProductMap(productMap);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cartItems]);
  const getProduct = (id) => {
    const product = productMap[id];
    return product ? product : {};
  };
  const total = cartItems.reduce(
    (acc, item) => {
      const product = getProduct(item.id);
      return acc + (product.price ? product.price.$numberDecimal : 0) * item.quantity;
    },
    0
  );
  const navigate = useNavigate();
  //checkout
  const onCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      const products = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        subtotal: getProduct(item.id).price.$numberDecimal * item.quantity
      }));
      const total = products.reduce((sum, item) => sum + item.subtotal, 0);
      const requestBody = {
        user: userId,
        products,
        total
      };
      console.log(requestBody, 'request Body');
    const response = await ProductDataService.createCheckOut(requestBody);
    console.log(response, 'CheckOutData');
    console.log("Successfully Checkout");
    navigate('/checkOut', { replace: true });//cahnge this
    onClose();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Cart</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex">
                      <img
                        src={getProduct(item.id)?.imgUrl}
                        alt={getProduct(item.id)?.productName}
                        className="cart-item-img"
                        style={{ maxWidth: '50px' }}
                      />
                      <span className="ml-2">{getProduct(item.id)?.productName}</span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${getProduct(item.id)?.price?.$numberDecimal ?? ''}</td>
                  <td>
                    <button className="btn btn-sm" onClick={() => removeItem(item)} style={{backgroundColor: "#e66aac", color: "white"}}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right font-weight-bold">Total: ${total.toFixed(2)}</p>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
    <Button onClick={onClose} style={{backgroundColor: "#e66aac", color: "white"}}>Close</Button>
      {cartItems.length > 0 && (
        <Button onClick={onCheckout} style={{backgroundColor: "#e66aac", color: "white"}}>Checkout</Button>
      )}
    </Modal.Footer>
  </Modal>


  );
};

export default CartModal;