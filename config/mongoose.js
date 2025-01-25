const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MOGO_URL);
// mongoose.connect("mongodb://localhost:27017/Products");

const db = mongoose.connection;

db.on("error", console.error.bind(console,"error to connect db"));

db.once("open", ()=>{
    console.log("db connected");
})