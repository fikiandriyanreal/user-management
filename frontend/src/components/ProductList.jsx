import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="px-4 mt-4">
        <Link to="add" className="button is-success mb-4">
          Add New
        </Link>
        <div className="columns is-multiline">
          {products.map((product) => (
            <div className="column is-one-quarter" key={product.uuid}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.url} alt="Image" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{product.name}</p>
                      <p className="subtitle is-6">{product.description}</p>
                    </div>
                  </div>
                </div>

                <footer className="card-footer">
                  <Link
                    to={`edit/${product.uuid}`}
                    className="card-footer-item"
                  >
                    Edit
                  </Link>
                  <a
                    onClick={() => deleteProduct(product.uuid)}
                    className="card-footer-item"
                    style={{ color: "red" }}
                  >
                    Delete
                  </a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
