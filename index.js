// modules 
const express = require("express")
const cors = require("cors")
const mongoose = require("./config/mongoose");
const products = require("./model/products");
const sassMiddleware = require("node-sass-middleware");
const expressLayouts = require("express-ejs-layouts");
const app = express();
require('dotenv').config()

const port = process.env.PORT


app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


// for sass files
app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
}))
// for comm with frontend

app.use(cors({
    origin: 'https://vrs-pickles-frontend.vercel.app'
}))


// for reducing unnecessary html code 
app.use(expressLayouts)

// for form data 
app.use(express.urlencoded({ extended: true }));

// for accessing images or uploading
app.use("/uploads", express.static(__dirname + "/uploads"));


// app.use("/css", express.static(__dirname + "/css"));

// this helped to apply the continuous changes made to css
app.use(express.static("assets"))

// engine and layouts
app.set("views", "views");
app.set("view engine", "ejs");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// server port 
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

// backend REST API's 

app.use("/", require("./router"));


// for frontend data
app.get("/", (req, res) => {
    products.find({})
    .then(products => {
        return res.json(products)
    })
})



