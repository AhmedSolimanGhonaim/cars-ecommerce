// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../store";
// import { useNavigate } from "react-router-dom";
// import { addNewUser } from "../api/userapi"; // Ensure this path is correct

// export function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const newUser = {
//       name,
//       email,
//       password,
//       role: "customer",
//     };

//     try {
//       // Use the API helper to add the new user
//       const response = await addNewUser(newUser);
//       console.log("Response from adding user:", response.data);
//       const createdUser = response.data;

//       // Update Redux state
//       dispatch(addUser(createdUser));

//       // Update sessionStorage with the new user list
//       const users = JSON.parse(sessionStorage.getItem("users")) || [];
//       users.push(createdUser);
//       sessionStorage.setItem("users", JSON.stringify(users));

//       navigate("/login");
//     } catch (error) {
//       console.error("Error signing up user:", error);
//       alert("Error signing up. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h1 className="card-title text-center">Sign Up</h1>
//               <form onSubmit={handleSignUp}>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary">
//                     Sign Up
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../api/userapi";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "customer",
    };

    try {
      const response = await addNewUser(newUser);
      const createdUser = response.data;

      // Update Redux state
      dispatch(addUser(createdUser));

      // Update sessionStorage with the new user list
      const users = JSON.parse(sessionStorage.getItem("users")) || [];
      users.push(createdUser);
      sessionStorage.setItem("users", JSON.stringify(users));

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
