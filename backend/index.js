const connectToMongo = require("./db");
const express = require("express");
const path = require("path");
const cors = require("cors"); // Add this line

connectToMongo();

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the frontend
app.use(express.static("https://i-notebook-frontend-wheat.vercel.app"));
app.use(express.json());

// Available routes
app.get("/", (req, res) => {
  res.send("Welcome to iNotebook");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`);
});
