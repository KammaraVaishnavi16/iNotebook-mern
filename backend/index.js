const connectToMongo = require("./db");
const express = require("express");
const path = require("path");
const cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

// app.use(express.static("https://i-notebook-frontend-wheat.vercel.app"));

app.use(express.static(path.join(__dirname, "../inotebook/build")));

//to use request body we use middleware
app.use(express.json());
//available routes
app.get("/", (req, res) => {
  res.send("Welecome to iNotebook");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`);
});
