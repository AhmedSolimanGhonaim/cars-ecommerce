import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store";
import { Tab, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {SignUp} from "./SignUp";

export function Login() {
  const [key, setKey] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      navigate(currentUser.role === "admin" ? "/admin" : "/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      dispatch(setCurrentUser(user));
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin" : "/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <h1 className="card-title text-center">Login</h1>
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="signup">
                    < SignUp />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}
