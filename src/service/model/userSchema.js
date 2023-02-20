const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
    userName: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    customerName: {
        type: String,  
        required : true
    },
    customerAddress: {
        type: String,
        required : true
    },
    customerContact: {
        type: String,
        required : true
    },
    customerEmail: {
        type: String,
        required : true
    },
    customerDOB: {
        type: String,
        required : true
    },
    customerType: {
        type: String,
        required : true
    },
}, {timestamps: true});

const UserTbl = mongoose.model("userAccount", userAccountSchema);
module.exports = UserTbl;