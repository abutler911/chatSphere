const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const router = express.Router();
const Room = require("../models/Room");

router.get("/rooms", isAuthenticated, async (req, res) => {
  try {
    const rooms = await Room.find({}).populate("createdBy", "username");
    res.render("rooms", {
      title: "Available Rooms",
      rooms: rooms,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.render("rooms", {
      title: "Available Rooms",
      rooms: [],
      error: "Error fetching rooms",
    });
  }
});

router.post("/createroom", isAuthenticated, async (req, res) => {
  try {
    // Convert room name to uppercase
    const roomNameUpperCase = req.body.roomName.toUpperCase();

    const newRoom = new Room({
      name: roomNameUpperCase,
      createdBy: req.user._id,
    });

    await newRoom.save();
    res.redirect("/rooms");
  } catch (error) {
    console.error(error);
    res.redirect("/rooms");
  }
});

router.post("/deleteroom/:roomId", isAuthenticated, async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.redirect("/rooms");
    }

    if (room.createdBy.toString() !== req.user._id.toString()) {
      return res.redirect("/rooms");
    }

    await Room.deleteOne({ _id: room._id });
    res.redirect("/rooms");
  } catch (error) {
    console.error(error);
    res.redirect("/rooms");
  }
});
module.exports = router;
