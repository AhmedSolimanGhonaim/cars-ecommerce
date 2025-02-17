import React from "react";
import { Badge, Table } from "react-bootstrap";
import "../styles/sellertable.css";
import { motion } from "framer-motion";

export function SellerTable({ sellerList, setSellerList }) {
  const handleDelete = (indexToDelete) => {
    const updatedList = sellerList.filter(
      (_, index) => index !== indexToDelete
    );
    setSellerList(updatedList);
  };


  

const AnimatedText = ({ text }) => {
  return (
    <h2 className="bg-info p-2 ">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );
};


  return (
    <div className="seller-table-container">
      <h2 className="mb-4 text-center bg-white p-2 animated-text">
        <AnimatedText text="our Listings" />
      </h2>
      {sellerList.length > 0 && (
        <div className="table-responsive table-wrapper">
          <Table striped bordered hover variant="dark" className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Owner</th>
                <th>Car Model</th>
                <th>FILES</th>
                <th>Year</th>
                <th>Color</th>
                <th>
                  
                    negotiable
              
                </th>
                <th>Price</th>
                <th colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerList.map((seller, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{seller.sellerId}</td>
                  <td>{seller.model}</td>
                  <td>
                    <a href="#!" className="text-decoration-none text-light">
                      {seller.file}
                    </a>
                  </td>
                  <td>{seller.year}</td>
                  <td
                    style={{
                      backgroundColor: seller.color,
                      color:
                        seller.color?.toLowerCase() === "black"
                          ? "white"
                          : seller.color?.toLowerCase() === "white"
                          ? "black"
                          : "white",
                    }}
                  >
                    {seller.color}
                  </td>
                  <td>
                    {seller.negotiate && (
                      <Badge bg="success" className="p-2 fs-6">
                        negotiable
                      </Badge>
                    )}
                  </td>
                  <td>{seller.price}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
