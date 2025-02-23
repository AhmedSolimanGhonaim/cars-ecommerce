import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearCart } from "../store"; // ✅ Import clearCart
import { FaShoppingCart } from "react-icons/fa";
import { DarkModeToggle } from "./DarkModeToggle";
import { toast } from "react-toastify"; // ✅ Ensure toast is imported

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    dispatch(clearCart()); 

    sessionStorage.clear(); 
    localStorage.removeItem("currentUser"); 

    navigate("/");
    toast.success("Logged out successfully");

    console.log("Current user after logout:", currentUser); // Debugging
    // fetch users again
  };

  return (
    <div className="container-fluid p-0 m-0">
      <Navbar bg="dark" variant="dark">
        <Container className="p-3" fluid>
          <NavLink to="/">
            <img
              src="/src/assets/logo2.png"
              className="d-none d-md-block"
              style={{ width: "150px" }}
              alt="Logo"
            />
          </NavLink>
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="products" className="nav-link">
              Products
            </NavLink>
            <NavLink to="about" className="nav-link">
              About
            </NavLink>
            <DarkModeToggle />
            {currentUser ? (
              <>
                <span className="nav-link">Hello, {currentUser.name}</span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink to="login" className="nav-link">
                Login
              </NavLink>
            )}
            {currentUser && (
              <NavLink to="/cart" className="nav-link position-relative">
                <FaShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
