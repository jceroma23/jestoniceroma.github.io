const UserTbl = require('../model/userSchema');
const validation = require('../utils/userValidation');
const bcrypt = require('../utils/bcrypt');
const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');

const signUpController = async (req, res) => {
    try {
        // Validate the request body using Joi
        const { error } = validation.userValidation.validate(req.body);
        // const { error } = validation.userValidation.validate(req.body.password);
        // Check if a user with the same username already exists in the database
        const isExisting = await UserTbl.findOne({ userName: req.body.userName });
        if (isExisting) {
            return res.status(400).json({ message: "A user with this username already exists." });
        }
        // If there are any validation errors, return an error response
        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ message: errorMessage });
        }
        //If No error continue to Save User Information
        const hashedPassword = await bcrypt.securePassword(req.body.password);
        const newUser = new UserTbl({
            userName: req.body.userName,
            password: hashedPassword,
            customerName: req.body.customerName,
            customerAddress: req.body.customerAddress,
            customerContact: req.body.customerContact,
            customerEmail: req.body.customerEmail,
            customerDOB: req.body.customerDOB,
            customerType: req.body.customerType
        });
        await newUser.save();
        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
}

const getAllUsers = async (req, res) => {
    try {
      const users = await UserTbl.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const loginController = async (req, res) => {
    const { userName, password } = req.body;
    try {
      // Find user by username
      const user = await UserTbl.findOne({ userName });
  
      // If user doesn't exist, send error response
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare password hash
      const isMatch = await bcrypt.comparePassword(password, user.password);
  
      // If password is incorrect, send error response
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Create and sign JWT token
      const token = jwt.sign(
        { userId: user._id, userName: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Send success response with JWT token
      res.json({ token: token, user: { userId: user._id, userName: user.userName } });
      console.log(token);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signUpController, getAllUsers, loginController };