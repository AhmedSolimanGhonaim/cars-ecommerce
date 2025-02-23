import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { IoTelescope } from "react-icons/io5";
import { FaCartArrowDown, FaCarTunnel } from "react-icons/fa6";
import { motion } from "framer-motion";
import "../styles/products.css";
import { Link } from "react-router-dom"; // Fixed incorrect import
import { addToCart } from "../store";
import { toast } from "react-toastify";

export function Products() {
  const dispatch = useDispatch();
  const sellerList = useSelector((state) => state.products);
  const currentUser = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search input
  const filteredProducts = sellerList.filter((product) => {
    const searchString = searchTerm.toLowerCase();
    return (
      product.model?.toLowerCase().includes(searchString) ||
      product.color?.toLowerCase().includes(searchString) ||
      product.year?.toString().includes(searchString) ||
      product.price?.toString().includes(searchString)
    );
  });

  const AnimatedText = ({ text }) => {
    return (
      <div>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error("Please login to add items to cart");
      return;
    }

    const cartItem = {
      id: product.id,
      model: product.model,
      year: product.year,
      color: product.color,
      price: product.price,
      image: product.image,
    };

    dispatch(addToCart(cartItem));

    // Update session storage
    const currentCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    currentCart.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(currentCart));

    toast.success("Added to cart successfully!");
  };

  return (
    <div
      className="all products container-fluid d-flex flex-column justify-content-center"
      data-bs-theme="dark"
    >
      <div className="welcoming d-flex d-none d-md-block flex-column justify-content-center align-items-center alert">
        <div className="p-5 alert-custom mt-5 fs-1 mx-auto">
          <motion.div
            className="text-center alert fw-bolder mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2>
              <AnimatedText text="We got You" />
            </h2>
            <motion.div
              className="d-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h5>
                in <span className="fs-1">SolyCars</span>
              </h5>{" "}
              <FaCarTunnel className="cary" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <h2 className="text-center py-5 text-dark w-50 mx-auto fs-1 fw-bolder prod-head">
        Our Products
      </h2>

      {/* ✅ Search Input Field (Now Functional) */}
      <div className="mt-5 container my-5 d-flex justify-content-between">
        <input
          type="text"
          className="w-25 form-control"
          placeholder="Search by model, color, year, or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // ✅ Updates searchTerm state
        />
      </div>

      {/* ✅ Display Filtered Products Instead of All */}
      {filteredProducts.length > 0 ? (
        <div
          id="productsSection"
          className="product-list d-flex flex-wrap container my-5 mx-auto"
        >
          {filteredProducts.map((seller, index) => {
            return (
              <Card
                className="m-2"
                key={index}
                style={{ width: "18rem", marginBottom: "1rem" }}
              >
                <Card.Img variant="top" src={seller.image} />
                <Card.Body>
                  <Card.Title>{seller.model}</Card.Title>
                  <Card.Text>${seller.price}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{seller.color}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link>
                    <Link
                      to={`/products/${seller.id}`}
                      className="btn btn-outline-info"
                    >
                      See Details <IoTelescope />
                    </Link>
                  </Card.Link>
                  <Card.Link>
                    <button
                      onClick={() => handleAddToCart(seller)}
                      className="btn btn-outline-info"
                    >
                      Add to <FaCartArrowDown className="text-success" />
                    </button>
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center">
          <h4>No products found.</h4>
        </div>
      )}
    </div>
  );
}
