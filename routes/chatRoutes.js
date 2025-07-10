const express = require("express");
const router = express.Router();
const ChatLog = require("../models/ChatLog");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Handle chat message
router.post("/message", async (req, res) => {
  const { message } = req.body;
  const siteID = req.siteID;
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    const reply = chatCompletion.choices[0].message.content;
    await ChatLog.create({ siteID, message, response: reply });
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Chat failed" });
  }
});

// Get chat logs
router.get("/logs", async (req, res) => {
  const siteID = req.siteID;
  const logs = await ChatLog.find({ siteID });
  res.json(logs);
});

module.exports = router;