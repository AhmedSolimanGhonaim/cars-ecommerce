import React from "react";
import "../styles/productdetails.css"
export function ProductDetails() {
  return (
    <div className="container-fluid details p-3">
      <div className="bg-dark p-5 container  mt-5 rounded text-white">
        <h2 className="text-warning mb-3"> Product Details</h2>
        <img
          width={"50%"}
          src="https://parkers-images.bauersecure.com/gallery-image/pagefiles/260057/1752x1168/09-lotus_elise.jpg"
                  alt=""
                  className="rounded-5"
        />
        <p className="lead fs-5">Car Model : toyota</p>
        <p className="lead fs-5">Car color : toyota</p>
        <p className="lead fs-5">Car price : toyota</p>
        <p className="lead fs-5">Car year : toyota</p>
        <p className="lead fs-5">Car price negotaition :yes</p>
        <button className="btn btn-primary">back to products page</button>
      </div>
    </div>
  );
}
