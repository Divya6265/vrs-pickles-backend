const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const PRODUCTS_PATH =   "/uploads/products/images"

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : [{type : String}],
        required : true
    }
});

let Storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname,"..",PRODUCTS_PATH))
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now());
    }
}) 
productSchema.statics.imgesUpload = multer({storage: Storage}).array("images");

productSchema.statics.PRODUCTS_PATH = PRODUCTS_PATH;    


const Products = mongoose.model("Products", productSchema);



module.exports = Products;