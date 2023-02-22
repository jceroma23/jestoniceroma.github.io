
const orderCheckoutTbl = require('../model/orderSchema');
const productsTbl = require('../model/productsSchema');
const UserTbl = require('../model/userSchema');
const mongoose = require('mongoose');


//display checkout details
const displayCheckout = async (req, res) => {
    try {
      const checkout = await orderCheckoutTbl.findById(req.params.checkoutId)
        .populate('user')
        .populate({
          path: 'products.product',
          model: 'productsTbl'
        });
      res.status(200).json(checkout);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //add checkout details
  //passing id thru local storage is not secure. but time is gold haha
  const createCheckout = async (req, res) => {
    try {
      const { user, products, total } = req.body;
 console.log(products);
    // Validate user exists
    const userExists = await UserTbl.findById(user);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }
  
      // Create the new checkout document
      const newCheckout = new orderCheckoutTbl({
        user,
        products,
        total,
      });
  
      // Save the checkout document to the database
      await newCheckout.save();
  
      res.status(200).json({ message: 'Checkout created successfully' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  module.exports = { displayCheckout, createCheckout };