import express from "express";
import { getAllUsersProfile, getSpecificUserProfile, createNewUserProfile } from "../controllers/profile.js";

export const profileRoutes = express.Router();

// view all users profile
profileRoutes.get('/', getAllUsersProfile);

// view specific user profile
profileRoutes.get('/:id', getSpecificUserProfile);

// create new user profile
profileRoutes.post('/create', createNewUserProfile);

// update user profile

// delete user profile