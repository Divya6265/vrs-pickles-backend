const express = require("express")
const cors = require("cors")
const mongoose = require("./config/mongoose");
const products = require("./model/products");
const sassMiddleware = require("node-sass-middleware");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000


app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
}))
app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/css", express.static(__dirname + "/css"));

// this helped to apply the continuous changes made to css
app.use(express.static("assets"))

app.set("views", "views");
app.set("view engine", "ejs");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})


app.use("/", require("./router"));

app.get("/", (req, res) => {
    products.find({})
    .then(products => {
        return res.json(products)
    })
})
