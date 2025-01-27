import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateOrder = () => {
  const initialOrderState = {
    customerName: "",
    productName: "",
    quantity: "",
    price: "",
  };

  const [order, setOrder] = useState(initialOrderState);
  const { id } = useParams(); // Get the order ID from URL params
  const navigate = useNavigate();

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     // console.log(name, value);

//     setUser({ ...user, [name]: value });
//   };


  // Fetch specific order details on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        toast.error("Failed to load order details.");
      });
  }, [id]);

  // Handle form input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/order/${id}`, order);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/manage-orders"); // Redirect to orders management page
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <header className="abu">
        <h1>Update Order</h1>
      </header>
      <Link to="/manage-orders" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <form onSubmit={submitForm}>
        <label>Customer Name</label>
        <input
          className="search-box"
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={order.customerName}
          onChange={inputHandler}
        />
        <label>Product Name</label>
        <input
          className="search-box"
          type="text"
          name="productName"
          placeholder="Product Name"
          value={order.productName}
          onChange={inputHandler}
        />
        <label>Quantity</label>
        <input
          className="search-box"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={order.quantity}
          onChange={inputHandler}
        />
        <label>Price</label>
        <input
          className="search-box"
          type="number"
          name="price"
          placeholder="Price"
          value={order.price}
          onChange={inputHandler}
        />
        <button type="submit" className="edit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateOrder;
