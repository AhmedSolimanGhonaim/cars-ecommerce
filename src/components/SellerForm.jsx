import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { addProduct } from "../store";
import { addNewProduct } from "../api/carsapi"; // Use the API helper
import axios from "axios";

function validateForm(values) {
  const errors = {};
  if (!values.sellerId.trim()) {
    errors.sellerId = "Owner ID is required";
  }
  if (!values.price) {
    errors.price = "Price is required";
  } else if (Number(values.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }
  if (!values.year) {
    errors.year = "Car Year is required";
  }
  if (!values.model) {
    errors.model = "Car Model is required";
  }
  if (!values.color || values.color === "color") {
    errors.color = "Car Color is required";
  }
  return errors;
}

export function SellerForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [formValues, setFormValues] = useState({
    sellerId: "",
    image: "",
    year: "",
    model: "",
    color: "",
    price: "",
    negotiate: false,
  });

  const [errors, setErrors] = useState({});

  const inputHandler = (event) => {
    const { name, type, checked, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Prepare product data by converting sellerId to ownerId and parsing numbers
        const productData = {
          ...formValues,
          ownerId: formValues.sellerId,
          year: Number(formValues.year),
          price: Number(formValues.price),
        };
        // Remove sellerId property since we've mapped it to ownerId
        delete productData.sellerId;

        const response = await addNewProduct(productData);
        const newProduct = response.data;

        dispatch(addProduct(newProduct));
        const updatedProducts = [...products, newProduct];
        sessionStorage.setItem("products", JSON.stringify(updatedProducts));

        // Reset form
        setFormValues({
          sellerId: "",
          image: "",
          year: "",
          model: "",
          color: "",
          price: "",
          negotiate: false,
        });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  return (
    <div className="seller-form-container bg-white p-3 rounded">
      <h2 className="mb-3 text-center">Add Car</h2>
      <Form onSubmit={handleAddProduct}>
        <Form.Group className="mb-3" controlId="formBasicOwner">
          <Form.Label>Owner ID</Form.Label>
          <Form.Control
            value={formValues.sellerId}
            type="text"
            name="sellerId"
            onChange={inputHandler}
            placeholder="Enter Owner ID"
            isInvalid={!!errors.sellerId}
          />
          {errors.sellerId && (
            <Form.Control.Feedback type="invalid">
              {errors.sellerId}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={formValues.price}
            type="number"
            name="price"
            onChange={inputHandler}
            placeholder="Enter price"
            isInvalid={!!errors.price}
          />
          {errors.price && (
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicimage">
          <Form.Label>Ownership images</Form.Label>
          <Form.Control onChange={inputHandler} name="image" type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCarYear">
          <Form.Label>Car Year</Form.Label>
          <Form.Select
            onChange={inputHandler}
            value={formValues.year}
            name="year"
            isInvalid={!!errors.year}
          >
            <option value="">Select Year</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Form.Select>
          {errors.year && (
            <Form.Control.Feedback type="invalid">
              {errors.year}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSelectCarModel">
          <Form.Label>Car Model</Form.Label>
          <Form.Select
            onChange={inputHandler}
            value={formValues.model}
            name="model"
            isInvalid={!!errors.model}
          >
            <option value="">Select Model</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
          </Form.Select>
          {errors.model && (
            <Form.Control.Feedback type="invalid">
              {errors.model}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSelectCarColor">
          <Form.Label>Car Color</Form.Label>
          <Form.Select
            onChange={inputHandler}
            value={formValues.color}
            name="color"
            isInvalid={!!errors.color}
          >
            <option value="">Select Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="gray">Gray</option>
          </Form.Select>
          {errors.color && (
            <Form.Control.Feedback type="invalid">
              {errors.color}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNegotiable">
          <Form.Check
            onChange={inputHandler}
            name="negotiate"
            type="checkbox"
            label="Negotiable"
            checked={formValues.negotiate}
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Add Product
        </Button>
      </Form>
    </div>
  );
}
