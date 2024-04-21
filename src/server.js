import express from "express";
import parser from "body-parser";
import cors from "cors";
import { logsRequest as middlewareLogsRequest } from "./middlewares/logs.js";
import { usersRoutes } from "./routes/users.js";
import { profileRoutes } from "./routes/profile.js";
import { blogRoutes } from "./routes/blog.js";
import { tagRoutes } from "./routes/tag.js";

const app = express();
const PORT = 4000;


//! Middlewares
app.use(cors());
app.use(middlewareLogsRequest);
// app.use(express.json());
app.use(parser.json());

//! Routes
app.use("/users", usersRoutes);
app.use("/profile", profileRoutes);
app.use("/blog", blogRoutes);
app.use("/tag", tagRoutes)


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})