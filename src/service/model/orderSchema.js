const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserTbl = require('./userSchema');
const productsTbl = require('./productsSchema');

const orderCheckoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserTbl',
    required: true
  },
  products: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'productsTbl',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    subtotal: {
      type: Schema.Types.Decimal128,
      required: true
    }
  }],
  total: {
    type: Schema.Types.Decimal128,
    required: true
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'created'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const orderCheckoutTbl = mongoose.model('orderCheckoutTbl', orderCheckoutSchema);
module.exports = orderCheckoutTbl;
