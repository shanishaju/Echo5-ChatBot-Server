// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { registerClient, loginClient } = require("../controllers/authController");

router.post("/register", registerClient);
router.post("/login", loginClient);

module.exports = router;