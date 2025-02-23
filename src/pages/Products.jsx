
import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { IoTelescope } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaCarTunnel } from "react-icons/fa6";
import { GrTurbolinux } from "react-icons/gr";
import { motion } from "framer-motion";
import "../styles/products.css";
import { Link } from "react-router";

export function Products() {
  const sellerList = useSelector((state) => state.products);

  const AnimatedText = ({ text }) => {
    return (
      <div>
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
      </div>
    );
  };

  return (
    <div className="all products container-fluid d-flex flex-column justify-content-center" data-bs-theme="dark">
      <div className="welcoming d-flex d-none d-md-block flex-column justify-content-center align-items-center alert">
        <div className="p-5 alert-custom mt-5 fs-1 mx-auto">
          <motion.div className="text-center alert fw-bolder mt-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h2>
              <AnimatedText text="We got You" />
            </h2>
            <motion.div className="d-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              <h5>
                in <span className="fs-1">SolyCars</span>
              </h5>{" "}
              <FaCarTunnel className="cary" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <h2 className="text-center py-5 text-dark w-50 mx-auto fs-1 fw-bolder prod-head">Our Products</h2>

      <div className="mt-5 container my-5 d-flex justify-content-between">
        <input type="text" className="w-25 form-control" placeholder="search ..." />
      </div>

      {sellerList.length > 0 ? (
        <div id="productsSection" className="product-list d-flex flex-wrap container my-5 mx-auto">
          {sellerList.map((seller, index) => {
            return (
              <Card className="m-2" key={index} style={{ width: "18rem", marginBottom: "1rem" }}>
                <Card.Img variant="top" src={seller.image} />
                <Card.Body>
                  <Card.Title>{seller.model}</Card.Title>
                  <Card.Text>${seller.price}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{seller.color}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">
                    <Link to={`products/${seller.id}`} className="btn btn-outline-info">
                      See Details <IoTelescope />
                    </Link>
                  </Card.Link>
                  <Card.Link href="#">
                    <Link to="/cart" className="btn btn-outline-info">
                      Add to <FaCartArrowDown className="text-success" />
                    </Link>
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center">
          <h4>No products added yet.</h4>
        </div>
      )}
    </div>
  );
}