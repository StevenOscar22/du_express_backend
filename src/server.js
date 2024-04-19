import express from "express";
import { usersRoutes } from "./routes/users.js";
import { profileRoutes } from "./routes/profile.js";
import { logsRequest as middlewareLogsRequest } from "./middlewares/logs.js";
import parser from "body-parser";
import cors from "cors";

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


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})