
const orderCheckoutTbl = require('../model/orderSchema');
const productsTbl = require('../model/productsSchema');
const UserTbl = require('../model/userSchema');


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
  const createCheckout = async (req, res) => {
    try {
      const { userId, products, total } = req.body;
  
      // Find the user by id
      const user = await UserTbl.findById(userId);
  
      // Create a new checkout record
      const checkout = await orderCheckoutTbl.create({
        user: user._id,
        products: products.map((product) => ({
          product: product.productId,
          quantity: product.quantity,
          subtotal: product.subtotal
        })),
        total,
        status: 'created'
      });
  
      res.status(201).json({ message: 'Checkout created successfully', checkout });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = { displayCheckout, createCheckout };