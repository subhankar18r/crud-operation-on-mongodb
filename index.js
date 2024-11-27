import express from "express";
import connectMongoDb from "./connection.js";
import userRouter from "./routes/users.js";

const PORT = 8000;
const app = express();

// connect with Mongodb
connectMongoDb("mongodb://localhost:27017/crud_app");

// to pass form data in req.body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRouter);

app.listen(PORT, () => console.log("server running on port: " + PORT));
