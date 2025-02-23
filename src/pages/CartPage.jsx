import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setCart } from "../store";
import { toast } from "react-toastify";

export function CartPage() {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    const updatedCart = cart.filter((item) => item.id !== productId);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error("Please login to checkout");
      return;
    }
    toast.success("Order placed successfully!");
    dispatch(setCart([]));
    sessionStorage.setItem("cart", "[]");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.model}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.model}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400">
                    Year: {item.year} | Color: {item.color}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ${item.price}
                    </span>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Total Items: {cart.length}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              Total Price: $
              {cart.reduce((total, item) => total + item.price, 0)}
            </p>
            <button
              className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
