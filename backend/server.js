const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const defineCurrentUser = require("./middleware/defineCurrentUser")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to mongoDB");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.use(defineCurrentUser)

app.get("/", (req, res) => {
    res.status(200).json({ message: "Fit App server"})
});

app.use("/workouts", require("./controllers/workout.js"));
app.use("/users", require("./controllers/user.js"));
app.use("/authentication", require("./controllers/authentication"))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });

app.listen(process.env.PORT, () => {
    console.log("Listening at port", process.env.PORT);
});