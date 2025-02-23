import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CartPage.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store";

export function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    storedCart.forEach((item) => dispatch(addToCart(item)));
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    const updatedCart = cart.filter((item) => item.id !== productId);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container bg-info cart mt-5">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">{item.model}</h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">${item.price}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <p className="card-text">Total Items: {totalItems}</p>
              <p className="card-text">Total Price: ${totalPrice}</p>
              <button className="btn btn-primary btn-block">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
