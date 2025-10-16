import express from "express";
import Message from "../models/message.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(200).json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
