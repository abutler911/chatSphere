const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/rooms", isAuthenticated, async (req, res) => {
  // Here you would fetch the list of rooms from your database
  // For now, let's just pass an empty array
  res.render("rooms", { title: "Available Rooms", rooms: [] });
});

// Add this in your roomslist.js or another appropriate router file
router.post("/createroom", isAuthenticated, async (req, res) => {
  // Logic to create a new room
  // Then redirect back to the roomslist
  res.redirect("/rooms");
});

router.post("/deleteroom/:roomId", isAuthenticated, async (req, res) => {
  // Logic to delete a room by req.params.roomId
  // Then redirect back to the roomslist
  res.redirect("/rooms");
});

module.exports = router;
