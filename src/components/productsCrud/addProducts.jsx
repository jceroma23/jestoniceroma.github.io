import React, { useState } from 'react';
import ProductDataService from "../../service/service";
import Sidebar from '../../layouts/sellerSideNav';
const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    imgUrl: '',
    rating: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ProductDataService.createProduct(formData);
      console.log(response.data);
      window.alert('Product added successfully');
      window.location.reload()
    } catch (error) {
      console.log(error);
      window.alert('Unable to add product');
    }
  };

  return (
    <div className='container d-flex justify-content-between align-items-center'>
      <Sidebar></Sidebar>
        <form className='d-flex flex-fill flex-column border border-1 rounded-1 p-5' onSubmit={handleSubmit}>
        <h1>Basic Information</h1>
        <label htmlFor="productName">Product Name :</label>
        <input className='form-control' type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} />

        <label htmlFor="price">Price :</label>
        <input className='form-control'  type="text" id="price" name="price" value={formData.price} onChange={handleChange} />

        <label htmlFor="imgUrl">Image URL :</label>
        <input className='form-control'  type="text" id="imgUrl" name="imgUrl" value={formData.imgUrl} onChange={handleChange} />

        <label htmlFor="rating">Rating :</label>
        <input className='form-control'  type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange} />
        
        <label htmlFor="description">Description :</label>
        <textarea className='form-control'  id="description" name="description" value={formData.description} onChange={handleChange}  rows="4" cols="50"></textarea>

        <div>
            <button className='mt-3 btn btn-primary' type="submit">Add Product</button>
        </div>
        </form>
    </div>
  );
};

export default AddProductForm;
