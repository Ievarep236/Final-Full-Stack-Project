const express = require("express");
const cors = require("cors");
const login = require("./src/routes/login");
const register = require("./src/routes/register");
const clients = require("./src/routes/clients");
require("dotenv").config();

const server = express();

server.use(cors());
server.use(express.json());

server.use("/register", register);
server.use("/login", login);
server.use("/clients", clients);

const PORT = process.env.PORT;

server.listen(8080, () => console.log(`server is running on ${PORT} `));
