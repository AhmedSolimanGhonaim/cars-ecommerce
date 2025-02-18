import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FaCartArrowDown } from "react-icons/fa6";
import { IoTelescope } from "react-icons/io5";
import { FaCarTunnel } from "react-icons/fa6";
import { GrTurbolinux } from "react-icons/gr";
import { motion } from "framer-motion";

import "../styles/products.css";

export function Products() {
  const engRef = useRef(null);

  const AnimatedText = ({ text }) => {
    return (
      <h2 className="">
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

  const handleStart = () => {
    const audio = new Audio("/dodge.mp3");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);

    if (engRef.current) {
      engRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="products container-fluid d-flex flex-column justify-content-center bg-dark"
      data-bs-theme="dark"
    >
      <div className="welcoming d-flex d-none d-md-block flex-column justify-content-center align-items-center alert">
        <div className="p-5 alert-custom mt-5 fs-1 mx-auto">
          <motion.div
            className="text-center alert fw-bolder mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2>
              <AnimatedText text="We got You" />
            </h2>
            <motion.div
              className="d-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h5>
                in <span className="fs-1">SolyCars</span>
              </h5>{" "}
              <FaCarTunnel className="cary" />
            </motion.div>
          </motion.div>

          <button
            ref={engRef}
            onClick={handleStart}
            className="bg-dark rounded-3 p-2 border-0"
          >
            Start{" "}
            <span className="text-success rounded-3 p-2">
              Engine <GrTurbolinux />
            </span>
          </button>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-center py-5 text-dark w-50 mx-auto fs-1 fw-bolder prod-head">
        Our Products
      </h2>

      {/* Controls */}
      <div className="mt-5 container my-5 d-flex justify-content-between">
        <button className="btn btn-primary">Add Product</button>
        <input
          type="text"
          className="w-25 form-control"
          placeholder="search ..."
        />
      </div>

      <div
        id="productsSection"
        className=" product-list container my-5 mx-auto"
      >
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://th.bing.com/th/id/OIP.1JTXd333FnsKZ_N12qqSPwHaEK?rs=1&pid=ImgDetMain"
          />
          <Card.Body>
            <Card.Title>Car model</Card.Title>
            <Card.Text>price</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>color</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">
              See About <IoTelescope />
            </Card.Link>
            <Card.Link href="#">
              <button className="btn btn-outline-info">
                Add to <FaCartArrowDown className="text-success" />
              </button>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
