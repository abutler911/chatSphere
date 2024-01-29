require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");

const connectDB = require("../config/database");

// Import routers
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");
const logoutRouter = require("./routes/logout");
const roomsRouter = require("./routes/rooms");

// Initialize Express app
connectDB();
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
// Correct the path to the views directory
app.set("views", path.resolve(__dirname, "views"));
console.log("Views directory:", app.get("views"));

app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Middleware for static files
app.use(express.static("public"));

// Middleware for body parsing
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Define routes
// app.use("/", registerRouter);
// app.use("/", authRouter);
// app.use("/", chatRouter);
// app.use("/", logoutRouter);
// app.use("/", roomsRouter);

// Default route for landing page
app.get("/", (req, res) => {
  res.render("landing", { title: "Welcome to ChatSphere" });
});

app.get("/test", (req, res) => {
  res.render("partials/header", { title: "TEST!!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
