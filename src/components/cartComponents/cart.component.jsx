import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProductDataService from '../../service/service';

const CartModal = ({ onClose, show }) => {
  //cart
  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setcartItems(items);
    console.log(items, 'useeffect');
  }, []);
  const updateCart = (items) => {
    setcartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
    console.log(items, 'updateCart');
  };
  const removeItem = (item) => {
    const newItems = cartItems.filter((cartItems) => cartItems.productId !== item.productId);
    updateCart(newItems);
    console.log(newItems, 'removeCart');
  };
  const [productMap, setProductMap] = useState({});
  useEffect(() => {
    const ids = cartItems.map((item) => item.productId);
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
  console.log(`getProductid:(${id}):`, product);
  return product ? product : {};
  };
  const total = cartItems.reduce(
    (acc, item) => {
      const product = getProduct(item.productId);
      return acc + (product.price ? product.price.$numberDecimal : 0) * item.quantity;
    },
    0
  );




  //checkout
  const onCheckout = async () => {
    try {
      const userId = '...'; // Replace with the ID of the currently logged-in user
      const requestBody = {
        userId,
        products: cartItems,
        total,
      };
      const response = await ProductDataService.createCheckOut(requestBody);
      console.log(response.data);
      console.log("Successfully Checkout");
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
                <tr key={item.productId}>
                  <td>
                    <div className="d-flex">
                      <img
                        src={getProduct(item.productId)?.imgUrl}
                        alt={getProduct(item.productId)?.productName}
                        className="cart-item-img"
                        style={{ maxWidth: '50px' }}
                      />
                      <span className="ml-2">{getProduct(item.productId)?.productName}</span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${getProduct(item.productId)?.price?.$numberDecimal ?? ''}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => removeItem(item)}>Remove</button>
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
    <Button variant="secondary" onClick={onClose}>Close</Button>
      {cartItems.length > 0 && (
        <Button variant="primary" onClick={onCheckout}>Checkout</Button>
      )}
    </Modal.Footer>
  </Modal>


  );
};

export default CartModal;
