
const orderCheckoutTbl = require('../model/orderSchema');
const productsTbl = require('../model/productsSchema');
const UserTbl = require('../model/userSchema');
const mongoose = require('mongoose');


//display checkout details
const displayAllCheckout = async (req, res) => {
  try {
    const checkouts = await orderCheckoutTbl
      .find()
      .populate('user', 'customerName')
      .populate('products.id', 'productName')
      .select(' products.subtotal total status products.quantity products.subtotal products.price created_at updated_at');
    console.log(checkouts);
    res.status(200).json(checkouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//edit
// PUT /checkout/:id
const updateCheckoutStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  orderCheckoutTbl.findByIdAndUpdate(id, { status }, { new: true })
    .then(updatedCheckout => {
      if (!updatedCheckout) {
        return res.status(404).json({ message: `Checkout with id ${id} not found` });
      }
      res.json(updatedCheckout);
    })
    .catch(error => next(error));
};
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
  

  //delete
  const deleteCheckout = async (req, res) => {
    try {
      const checkoutId = req.params.id;
  
      // Validate the checkout ID
      if (!mongoose.Types.ObjectId.isValid(checkoutId)) {
        return res.status(400).json({ error: 'Invalid checkout ID' });
      }
  
      // Delete the checkout document
      const deletedCheckout = await orderCheckoutTbl.findByIdAndDelete(checkoutId);
  
      if (!deletedCheckout) {
        return res.status(404).json({ error: 'Checkout not found' });
      }
  
      res.status(200).json({ message: 'Checkout deleted successfully' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = { displayAllCheckout, createCheckout, deleteCheckout, updateCheckoutStatus };