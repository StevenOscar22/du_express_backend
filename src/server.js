import express from "express";
import { usersRoutes } from "./routes/users.js";
import { logsRequest as middlewareLogsRequest } from "./middlewares/logs.js";
import parser from "body-parser";

const app = express();
const PORT = 4000;


//! Middlewares
app.use(middlewareLogsRequest);
// app.use(express.json());
app.use(parser.json());

//! Routes
app.use("/users", usersRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})