import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setProducts, setCurrentUser, setCart } from "../store";
import { Admin } from "../pages/Admin";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { ProductDetails } from "../pages/ProductDetails";
import { NotFound } from "../pages/NotFound";
import { About } from "../pages/About";
import { CartPage } from "../pages/CartPage";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { SharedLayout } from "../SharedLayout/SharedLayout";
import { toast } from "react-toastify";

export function MainLayout() {
  const Admin2 = () => {
    if (!currentUser) {
      toast.error("Please login first");
      return <Navigate to="/login" />;
    }
    if (currentUser.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      return <Navigate to="/" />;
    }
    return <Navigate to="/admin" />;
  };


  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    // Initialize user session
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (storedUser) {
      dispatch(setCurrentUser(storedUser));
    }
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/products"),
        ]);

        const users = await usersRes.json();
        const products = await productsRes.json();
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];

        dispatch(setUsers(users));
        dispatch(setProducts(products));
        dispatch(setCart(storedCart));

        sessionStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("products", JSON.stringify(products));
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/cart" element={<CartPage />} /> */}
            <Route
              path="/cart"
              element={
                currentUser ? <CartPage /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
