const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const FAQ = require("../models/FAQ");
const ChatLog = require("../models/ChatLog");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// POST /api/chat (main chat endpoint)
router.post("/", async (req, res) => {
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

// Upload FAQ files
router.post("/upload", upload.single("file"), async (req, res) => {
  const siteID = req.siteID;
  const file = req.file;
  if (!file || ![".pdf", ".docx", ".txt"].includes(path.extname(file.originalname))) {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
    return res.status(400).json({ error: "Invalid file type" });
  }
  const extractedText = fs.readFileSync(file.path, "utf-8");
  await FAQ.create({
    siteID,
    filename: file.originalname,
    path: file.path,
    extractedText,
  });
  res.json({ message: "File uploaded" });
});

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