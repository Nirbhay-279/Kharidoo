const express = require("express");
const { fetchUserById, updateUser, createUser ,fetchUserByEmail } = require("../controller/User");

const User = express.Router();
//  /users is already added in base path
User.get("/:id", fetchUserById)
  .get("/", fetchUserByEmail)
  .post("/", createUser)
  .patch("/", updateUser);

module.exports = User;
