import React from "react";
import { motion } from "framer-motion";

import "../styles/home.css";
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
    <div className="home container-fluid my-5  text-white">
      <AnimatedText text="Welcome to SolyCars" />
      <div className="description bg-white w-50 text-dark p-5">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit et,
          totam qui consectetur quidem distinctio dignissimos earum praesentium
          animi sequi, quis culpa neque. Repudiandae ipsa adipisci dolorem
          laborum illum tempora?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit et,
          totam qui consectetur quidem distinctio dignissimos earum praesentium
          animi sequi, quis culpa neque. Repudiandae ipsa adipisci dolorem
          laborum illum tempora?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit et,
          totam qui consectetur quidem distinctio dignissimos earum praesentium
          animi sequi, quis culpa neque. Repudiandae ipsa adipisci dolorem
          laborum illum tempora?
        </p>
        <button className="btn btn-dark">button</button>
      </div>
    </div>
  );
}
