const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// API Endpoints
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Seed database
app.get("/seed", async (req, res) => {
  const products = [
    { name: "Laptop", price: 1000, image: "https://via.placeholder.com/150" },
    { name: "Phone", price: 500, image: "https://via.placeholder.com/150" },
    {
      name: "Headphones",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
  ];
  await Product.insertMany(products);
  res.send("Database seeded!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
