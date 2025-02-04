import express from "express";
import cors from "cors";
import { connectDB } from "./configuration/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import dotenv from 'dotenv'
import cartRouter from "./routes/cartRoute.js";
// import bodyParser from "body-parser";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// Database Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // To access images and show it to the frontend
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, from Database!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});


