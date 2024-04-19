import express from "express";

const app = express();

export const blogRoutes = express.Router();

// view all blog
blogRoutes.get("/", (req, res) => {
    res.send("Hello World");
})