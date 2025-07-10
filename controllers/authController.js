const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerClient = async (req, res) => {
  const { siteID, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const client = await Client.create({ siteID, email, password: hashed });
    const token = jwt.sign({ siteID }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginClient = async (req, res) => {
  const { siteID, password } = req.body;
  try {
    const client = await Client.findOne({ siteID });
    if (!client) return res.status(401).json({ error: "Site not found" });
    const match = await bcrypt.compare(password, client.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });
    const token = jwt.sign({ siteID }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
