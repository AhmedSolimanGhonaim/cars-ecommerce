import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setProducts, setCurrentUser } from "../store";
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

export function MainLayout() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/products"),
        ]);

        const users = await usersRes.json();
        const products = await productsRes.json();

        dispatch(setUsers(users));
        dispatch(setProducts(products));
        sessionStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("products", JSON.stringify(products));
      } catch (error) {
        console.error("Error fetching data:", error);
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
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/admin"
              element={
                currentUser?.role === "admin" ? <Admin /> : <Navigate to="/" />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
