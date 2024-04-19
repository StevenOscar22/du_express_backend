import express from "express";
import { getAllUsers, createNewUser, getSpecificUser, updateUser, deleteUser } from "./../controllers/users.js";

export const usersRoutes = express.Router();

// view user
usersRoutes.get("/", getAllUsers);

// view specific user
usersRoutes.get("/:id", getSpecificUser);

// create user
usersRoutes.post("/create", createNewUser);

// update user
usersRoutes.patch("/update/:id", updateUser);

// delete user
usersRoutes.delete("/delete/:id", deleteUser);