
import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoTelescope } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { Table, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function UserManagement({ handleDeleteUser }) {
  const users = useSelector((state) => state.users);

  return (
    <div className="container bg-dark">
      <h2 className="bg-info text-light text-center">User Management</h2>
      <div className="table">
        <Table striped bordered hover variant="dark" className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
                    <MdDeleteForever />
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-success btn-sm">
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-info btn-sm">
                    <IoTelescope />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}