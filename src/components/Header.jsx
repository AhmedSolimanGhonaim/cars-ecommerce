import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.removeItem("currentUser");
    navigate("/");
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
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
