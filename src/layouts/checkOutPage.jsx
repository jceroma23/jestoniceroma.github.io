import React, { useEffect, useState } from 'react';
import ProductDataService from '../service/service';
import { Table } from 'react-bootstrap';
const CheckoutTable = () => {
const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    ProductDataService.displayAllCheckOut('/checkOut')
      .then(response => {
        setCheckouts(response.data);
        console.log(checkouts.total); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 
  return (
    <div>
      <h1>Checkout Details</h1>
      {checkouts.map(checkout => (
        <div key={checkout._id} style={{ marginBottom: '1rem' }}>
          <p>Customer Name: {checkout.user.customerName}</p>
          <div style={{ marginBottom: '0.5rem' }}>
            <label htmlFor={`status-${checkout._id}`}>Status:</label>
            <select
              id={`status-${checkout._id}`}
            //   value={status}
            //   onChange={e => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {checkout.products.map(product => (
                <tr key={product.id._id}>
                  <td>{product.id.productName}</td>
                  <td>{product.quantity}</td>
                  <td>${product.subtotal.$numberDecimal}</td>
                  <td>
                  {product.price && product.price.$numberDecimal}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className='display-6'>Total: ${checkout.total.$numberDecimal}</p>
          <button 
          className='btn btn-primary'
        //   onClick={handleSave}
          >
            Save</button>
        </div>
      ))}
    </div>
  );
                  };


export default CheckoutTable;