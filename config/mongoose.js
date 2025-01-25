const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MOGO_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console,"error to connect db"));

db.once("open", ()=>{
    console.log("db connected");
})