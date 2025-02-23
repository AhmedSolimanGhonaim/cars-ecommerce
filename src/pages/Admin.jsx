import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SellerForm } from "../components/SellerForm";
import { SellerTable } from "../components/SellerTable";
import "../styles/sellertable.css";
import { Tab, Tabs } from "react-bootstrap";
import UserManagement from "./UserManagement";
import { deleteUser } from "../store";
import axios from "axios";

export function Admin() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const products = useSelector((state) => state.products);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      dispatch(deleteUser(userId));
      sessionStorage.setItem(
        "users",
        JSON.stringify(users.filter((user) => user.id !== userId))
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <main className="admin container-fluid">
      <Tabs
        defaultActiveKey="add"
        transition={true}
        id="noanim-tab-example"
        className="mb-3 container-fluid"
      >
        <Tab eventKey="add" title="cars">
          <div className="row w-100 p-3 ">
            <div className="col-md-4 mb-4">
              <SellerForm />
            </div>
            <div className="col-md-8">
              <SellerTable />
            </div>
          </div>
        </Tab>
        <Tab eventKey="users" title="users">
          <UserManagement handleDeleteUser={handleDeleteUser} />
        </Tab>
      </Tabs>
    </main>
  );
}
