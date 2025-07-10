const fs = require("fs");
const path = require("path");
const FAQ = require("../models/FAQ");

exports.uploadFAQ = async (req, res) => {
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
};
