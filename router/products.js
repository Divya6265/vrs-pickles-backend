const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController")

router.get("/", productController.allProducts);
router.get("/add-product", productController.addProduct );
router.get("/edit-product/:id", productController.editProduct );
router.get("/delete-image", productController.deleteImage );
router.get("/delete-product/:id", productController.deleteProduct);

router.get("/:id", productController.getProduct);

router.post("/create-product", productController.createProduct);
router.post("/update-product", productController.updateProduct);


module.exports = router;