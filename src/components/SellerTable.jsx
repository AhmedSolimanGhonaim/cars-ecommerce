import React from "react";
import { Badge, Table } from "react-bootstrap";
import "../styles/sellertable.css";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { IoTelescope } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../store";
import { deleteProductAPI, editProduct } from "../api/carsapi";
export function SellerTable() {
  const sellerList = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDelete = async (productId) => {
    try {
      await deleteProductAPI(productId);
      dispatch(deleteProduct(productId));
      const updatedProducts = sellerList.filter(
        (product) => product.id !== productId
      );
      sessionStorage.setItem("products", JSON.stringify(updatedProducts));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (product) => {
    try {
      // For demo purposes, you might open a modal or inline edit.
      // Here, we simply send the same product back to update.
      const response = await editProduct(product.id, product);
      const updatedProduct = response.data;
      dispatch(updateProduct(updatedProduct));
      const updatedProducts = sellerList.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      sessionStorage.setItem("products", JSON.stringify(updatedProducts));
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const AnimatedText = ({ text }) => {
    return (
      <h2 className="bg-info p-2">
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
      <div className="mt-5 container my-5 d-flex justify-content-between">
        <input
          type="text"
          className="w-25 form-control"
          placeholder="search ..."
        />
      </div>
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
                <th>Image</th>
                <th>Year</th>
                <th>Color</th>
                <th>Negotiable</th>
                <th>Price</th>
                <th colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerList.map((seller, index) => (
                <tr key={seller.id}>
                  <td>{index + 1}</td>
                  <td>{seller.ownerId}</td>
                  <td>{seller.model}</td>
                  <td>
                    <a
                      href={seller.image}
                      className="text-decoration-none text-light"
                    >
                      {seller.image}
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
                        Negotiable
                      </Badge>
                    )}
                  </td>
                  <td>{seller.price}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(seller.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleEdit(seller)}
                    >
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
      )}
    </div>
  );
}
