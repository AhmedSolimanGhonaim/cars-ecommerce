import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/about.css";
export function About() {
  return (
    <div className="container-fluid  about ">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-custom shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center">About Us</h1>
              <p className="card-text">
                Welcome to our car selling website! We are dedicated to
                providing you with the best selection of cars at competitive
                prices.
              </p>
              <p className="card-text">
                Our mission is to make car buying easy and enjoyable. We offer a
                wide range of vehicles to suit every need and budget.
              </p>
              <p className="card-text">
                Our team is passionate about cars and committed to helping you
                find the perfect vehicle. Thank you for choosing us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
