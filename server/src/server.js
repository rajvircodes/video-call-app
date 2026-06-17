import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world from backend");
});

connectDB();

const PORT = process.env.PORT;

app.listen(3000, () => {
  console.log(`Server is running on ${PORT}`);
});
