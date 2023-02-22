const productsTbl = require('../model/productsSchema');

//show All Products
const showAllProducts = async (req, res) => {
        productsTbl.find().sort({createdAt:-1})
    .then((productItem) => {
         res.status(200).send(productItem);
        console.log("working");
    })
    .catch(err => console.log(err));
}
//search by Name
const findSearchProducts = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        let searchFilter = {};
    
        if (searchTerm) {
          const regex = new RegExp(searchTerm, 'i');
          searchFilter = { productName: regex };
        }
    
        const products = await productsTbl.find(searchFilter).sort({ createdAt: -1 });
        res.status(200).json(products);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
      }
}

//addProducts
const addProducts = async (req, res) => {
    try {
        const { productName, price, description, imgUrl, rating } = req.body;
        const newProduct = new productsTbl({ productName, price, description, imgUrl, rating });
        const product = await newProduct.save();
        res.status(201).json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    
    //This is for POSTMAN
    // const products = new productsTbl(req.body);
    // try {
    //     await products.save();
    //     res.status(201).send(products);
    // } catch (error) {
    //     res.status(400).send({error});    
    // }
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
    productEdit,
    findSearchProducts
    };