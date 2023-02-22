import React, { useState, useEffect } from "react";
import ProductDataService from "../../service/service";
import "../../assets/style/products.css";
import { Card, Button } from 'react-bootstrap';
import ProductModal from "../../layouts/productModal";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const ProductsDisplay = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
 
  const fetchProducts = async () => {
    try {
      let response;
      if (searchTerm) {
        response = await ProductDataService.search(searchTerm, currentPage, itemsPerPage);
      } else {
        response = await ProductDataService.getAll(currentPage, itemsPerPage);
      }
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProducts = products.filter((product) =>
  // console.log(product, 'product only')
  product.productName.toLowerCase().includes(searchTerm.toLowerCase())
);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchTerm('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="text-center">Product List</h1>
      <form className="mb-3" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="searchTerm">Search</label>
          <input
            type="text"
            className="form-control"
            id="searchTerm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product name"
          />
        </div>
        <Button type="submit" className="mr-2">
          Search
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </form>
      <div className="container d-flex flex-wrap justify-content-center mt-5">
        {filteredProducts
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <Card className="m-3" key={product._id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.imgUrl} />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price.$numberDecimal}</Card.Text>
                <Rating name="read-only" value={product.rating} readOnly />
                <Button variant="primary" onClick={() => setSelectedProduct(product)}>
                  View
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  onClick={() => setCurrentPage(number)}
                  className="page-link"
                  disabled={currentPage === number}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
       
      />
    </div>

  );
};

export default ProductsDisplay;
