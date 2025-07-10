const ChatLog = require("../models/ChatLog");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handleMessage = async (req, res) => {
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
};

exports.getLogs = async (req, res) => {
  const siteID = req.siteID;
  const logs = await ChatLog.find({ siteID });
  res.json(logs);
};