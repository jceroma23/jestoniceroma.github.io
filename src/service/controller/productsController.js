const productsTbl = require('../model/productsSchema');

//show All Products
const showAllProducts = (req, res) => {
    productsTbl.find().sort({createdAt:-1})
    .then((productItem) => {
         res.status(200).send(productItem);
        console.log("working");
    })
    .catch(err => console.log(err));
}

//addProducts
const addProducts = async (req, res) => {
    const products = new productsTbl(req.body);
    try {
        await products.save();
        res.status(201).send(products);
    } catch (error) {
        res.status(400).send({error});    
    }
}

//view by Id
const findProduct = (req, res) => {
    const id = req.params.id;
    productsTbl.findById(id)
    .then((productItem) => {
        res.status(200).send(productItem);
    })
    .catch (err => console.log.err);
}

//delete by Id
const productsDelete = async (req, res) => {
    const id = req.params.id;
    const deleteProduct = await productsTbl.findByIdAndDelete(id);
    if (!deleteProduct){
        return res.status(404).send(`Book Cant be deleted`);
    } 
    //res.redirect('/gallery');
    res.status(201).send('Deleted Successfully');
};

//edit products
const productEdit = async(req, res) => {
   let id = req.param.id;
    // let body = req.body.productName;
   let productUpdate = await productsTbl.findByIdAndUpdate(id, {
       productName : req.body.productName,
       price : req.body.price,
       description: req.body.description,
       imgUrl: req.body.imgUrl,
       rating: req.body.rating
   });
   console.log('body items', productUpdate);
   if(!productUpdate){
    return res.status(400).send('Book cant be updated');
   }
   res.status(201).send(productUpdate);
}

module.exports = {
    showAllProducts,
    addProducts,
    findProduct,
    productsDelete,
    productEdit
    };