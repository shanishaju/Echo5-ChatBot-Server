const mongoose = require("mongoose");

const ChatLogSchema = new mongoose.Schema({
  siteID: { type: String, required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatLog", ChatLogSchema);