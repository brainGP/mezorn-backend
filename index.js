const express = require("express");
const { connectDB } = require("./db");

const { login, signup, getUsers } = require("./controllers");

const app = express();
app.use(express.json());

const { HOST, PORT } = process.env;

connectDB();

const url = `http://${HOST}:${PORT}`;

app.post("/login", login);
app.post("/signup", signup);
app.get("/users", getUsers);

app.listen(PORT, () => console.log(`Running Express Server on ${url}`));
