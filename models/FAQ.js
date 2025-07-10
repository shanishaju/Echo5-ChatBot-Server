const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  siteID: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  extractedText: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FAQ", FAQSchema);