const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  siteID: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Client", ClientSchema);