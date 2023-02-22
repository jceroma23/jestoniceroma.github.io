//dependencies Import
const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cors = require('cors');
const productRouter = require('./service/routes/productRouter');
const userRouter = require('./service/routes/userRouter');
const orderRouter = require('./service/routes/orderRouter')
//express app
dotEnv.config();
const app = express();


//middleware
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

mongoose.Promise = global.Promise;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//routes
app.use((req, res, next)=>{
    console.log("host", req.hostname);
    console.log("path", req.path);
    next();
})
app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', orderRouter);
//connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // console.log('MONGO is Now Running');
})
mongoose.connect(process.env.DB_CONNECT, ()=> {
    console.log('MONGO is Now Running');
})
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});