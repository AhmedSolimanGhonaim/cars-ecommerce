import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export function Header() {
  return (
    <div className=" container-fluid p-0 ">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand  href="#home"><img src="/src/assets/logo2.png" className="d-none d-md-block" style={{ width: "20%" }} alt="" /></Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#signin/out">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
