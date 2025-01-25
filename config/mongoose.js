const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://21505a0506:12345@cluster0.pobbk4f.mongodb.net/");
mongoose.connect("mongodb://localhost:27017/Products");

const db = mongoose.connection;

db.on("error", console.error.bind(console,"error to connect db"));

db.once("open", ()=>{
    console.log("db connected");
})