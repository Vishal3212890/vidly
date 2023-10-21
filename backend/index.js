const config = require("config");
const Joi = require("joi");
const cors = require("cors");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening on port ${port}...`));
