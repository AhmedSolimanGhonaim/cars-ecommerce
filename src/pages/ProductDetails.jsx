import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../api/carsapi";
import { toast } from "react-toastify";
import "../styles/productdetails.css";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error loading product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2>Product not found</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid details p-3">
      <div className="bg-dark p-5 container mt-5 rounded text-white">
        <h2 className="text-warning mb-3">Product Details</h2>
        <img
          width={"50%"}
          src={product.image}
          alt={product.model}
          className="rounded-5"
        />
        <div className="product-info mt-4">
          <p className="lead fs-5">Car Model: {product.model}</p>
          <p className="lead fs-5">Car Color: {product.color}</p>
          <p className="lead fs-5">Car Price: ${product.price}</p>
          <p className="lead fs-5">Car Year: {product.year}</p>
          <p className="lead fs-5">
            Price Negotiation: {product.negotiate ? "Yes" : "No"}
          </p>

          <div className="mt-4">
            <button
              className="btn btn-primary me-3"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
            {product.negotiate && (
              <button
                className="btn btn-success"
                onClick={() => toast.info("Contact seller for negotiation")}
              >
                Negotiate Price
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
