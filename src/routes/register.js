// routes/register.js

import express from "express";
import {registerUser} from "./../controllers/register.js";

export const register = express.Router();

// Rute untuk menangani registrasi pengguna
register.post('/', registerUser);



