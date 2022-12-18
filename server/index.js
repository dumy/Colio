const express = require("express");

var cors = require("cors");
const app = express();


app.use(cors());

var users = require("./user.js");
var servers = require("./server.js");



/////////////////////////////////////
// ALL YOUR MIDDLEWARE AND ROUTES GO HERE
// app.use(morgan("tinys")) // middleware for logging
app.use(express.urlencoded({ extended: true })); //middleware for parsing urlencoded data
app.use(express.json());

//both index.js and things.js should be in same directory
app.use("/user", users);
app.use("/server", servers);



app.listen(3000);
