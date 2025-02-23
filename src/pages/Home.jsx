import React from "react";
import { motion } from "framer-motion";

import "../styles/home.css";
import { Link } from "react-router";
export function Home() {
  const AnimatedText = ({ text }) => {
    return (
      <h1 className=" bg-dark w-50 my-5 text-center">
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
      </h1>
    );
  };
  return (
    <div className="home container-fluid my-5 text-white">
      <AnimatedText text="Welcome to SolyCars" />
      <div className="description bg-white w-50 text-dark p-5">
        <p>
          Welcome to SolyCars, your ultimate destination for premium cars. We offer a wide range of vehicles to suit all your needs and preferences. Our commitment is to provide you with the best car buying experience.
        </p>
        <p>
          At SolyCars, we believe in quality and customer satisfaction. Our team of experts is here to assist you in finding the perfect car that matches your lifestyle and budget. Explore our extensive collection and drive away with your dream car today.
        </p>
        <p>
          Join our community of happy customers and experience the excellence that SolyCars has to offer. We are dedicated to making your car buying journey smooth and enjoyable. Thank you for choosing SolyCars!
        </p>
        <Link to="/products" className="button btn btn-dark">Explore Now</Link>
      </div>
    </div>
  );
}
