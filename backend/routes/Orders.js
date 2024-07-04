const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Orders.js");

const Orders = express.Router();
//  /orders is already added in base path
Orders.post("/", createOrder)
  .get("/:id", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get("/", fetchAllOrders);

module.exports = Orders;
