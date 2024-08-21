// server/index.js

const express = require("express");
var path = require("path");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const apiKey = process.env.API_KEY;

const PORT = process.env.PORT || 3001;

const app = express();

app.use("/public", express.static("./public/")); // Use custom JS and CSS files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("client/build"));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/config", (req, res) => {
  res.json({
    dbHost: dbHost,
    apiKey: apiKey,
    // Do not send sensitive data like DB_PASS in a real application
  });
});

app.get("*", function (req, res) {
  console.log(
    "Defualt Client Route",
    path.resolve(__dirname, "..", "client", "build", "index.html")
  );
  //
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
