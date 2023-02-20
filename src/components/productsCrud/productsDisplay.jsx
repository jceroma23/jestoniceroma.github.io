import React, { useState, useEffect } from "react";
import ProductDataService from "../../service/service";
import '../../assets/style/products.css'
const ProductsDisplay = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const response = await ProductDataService.getAll('/products')
            setProducts(response.data);
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1 className="text-center">Product List</h1>
            <div className="container d-md-flex justify-content-center mt-5">
                <ul className="d-flex container">
                    {products.map((product) => 
                    <li className="list-group-item m-2" key={product._id}>
                        <img src={product.imgUrl} alt="products" />
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.$numberDecimal}</p>
                        <p>Rating: {product.rating}</p>
                    </li>                
                    )}
                </ul>
            </div>
        </div>
    )
}


export default ProductsDisplay;