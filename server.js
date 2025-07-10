require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/faq", require("./routes/faqRoutes"));

app.get("/", (req, res) => {
res.send("Echo5Digital Chatbot Backend");
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});