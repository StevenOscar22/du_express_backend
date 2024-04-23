import express from "express";
import { getAllUsers, createNewUser, getSpecificUser, updateUser, deleteUser } from "./../controllers/users.js";

export const usersRoutes = express.Router();

// view user
usersRoutes.get("/", getAllUsers);

// view specific user
usersRoutes.get("/:id/profile", getSpecificUser);

// create user
usersRoutes.post("/create", createNewUser);

// update user
usersRoutes.patch("/:id/update", updateUser);

// delete user
usersRoutes.delete(":id/delete", deleteUser);