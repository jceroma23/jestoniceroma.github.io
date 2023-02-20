const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type: String,
        require: true
    },
    price:{
        type: Decimal128,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    imgUrl:{
        type: String,
        require: true
    },
    rating:{
        type: Number,
        require: true
    }
})

productSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const productsTbl = mongoose.model("productsTbl", productSchema);
module.exports = productsTbl;