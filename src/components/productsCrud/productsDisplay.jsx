import React, { useState, useEffect } from "react";
import ProductDataService from "../../service/service";
import "../../assets/style/products.css";

const ProductsDisplay = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductDataService.getAll(
        `/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      setProducts(response.data);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="text-center">Product List</h1>
      <div className="container d-md-flex justify-content-center mt-5">
        <ul className="d-flex container">
          {products.slice(0, itemsPerPage).map((product) => (
            <li className="list-group-item m-2" key={product._id}>
              <img src={product.imgUrl} alt="products" />
              <h2>{product.productName}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price.$numberDecimal}</p>
              <p>Rating: {product.rating}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={() => setCurrentPage(number)}
                  href="#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductsDisplay;
