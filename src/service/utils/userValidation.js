const Joi = require("Joi");
const UserTbl = require('../model/userSchema');

const userValidation = Joi.object({
    userName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    customerEmail: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    customerName: Joi.string().min(3).max(50).trim().required(),
    customerAddress: Joi.string().min(3).max(100).trim().required(),
    customerContact: Joi.string().trim().pattern(/^\d{10}$/).required(),
    customerEmail: Joi.string().email().trim().required(),
    customerDOB: Joi.date().required(),
    customerType: Joi.string().valid('admin', 'client').required()
});

const loginValidation = Joi.object({
    userName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    password: Joi.string().min(8).trim(true).required()
});

const isExisting = async (inputuserName) => {
    const userName = await UserTbl.findOne({userName: inputuserName}); 
    if(userName) {
        error = `${userName} is already exist!`;
        return error;
    }
}

module.exports = {
    userValidation,
    loginValidation,
    isExisting
}