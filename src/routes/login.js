// routes/login.js

import express from "express";
import { loginUser } from "./../controllers/login.js";

export const login = express.Router();

// Rute untuk menangani proses login
login.post('/', loginUser);

