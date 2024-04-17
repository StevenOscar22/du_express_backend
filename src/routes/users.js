import express from "express";
import { getAllUsers, createNewUser, getSpecificUser } from "./../controllers/users.js";

export const usersRoutes = express.Router();

usersRoutes.get("/", getAllUsers);
usersRoutes.get("/:id", getSpecificUser);
usersRoutes.post("/create", createNewUser);