import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store";
import { Tab, Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp";
import { toast } from "react-toastify";
import { getAllUsers } from "../api/userapi"; // Import API call
import "../styles/login.css";
export function Login() {
  const [key, setKey] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      navigate(currentUser.role === "/admin" ? "admin" : "/");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch users from db.json and store them in sessionStorage
    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        const users = response.data;
        sessionStorage.setItem("users", JSON.stringify(users));
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users from server.");
      }
    }

    // Fetch users only if not already in sessionStorage
    if (!sessionStorage.getItem("users")) {
      fetchUsers();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const users = JSON.parse(sessionStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        dispatch(setCurrentUser(user));
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        // Initialize empty cart if not present
        if (!sessionStorage.getItem("cart")) {
          sessionStorage.setItem("cart", JSON.stringify([]));
        }
        // Navigate("/");

        toast.success(`Welcome back, ${user.name}!`);
        navigate(user.role === "admin" ? "/admin" : "/");
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
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
                    <h1 className="card-title text-center text-primary">
                      Login
                    </h1>
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control in"
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            color: "var(--text-primary)",
                          }}
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control in"
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            color: "var(--text-primary)",
                          }}
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
                    <SignUp />
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
