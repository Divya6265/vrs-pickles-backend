
const products = require("../model/products");

module.exports.allProducts = (req, res) => {
    products.find({}).then(products => {
        return res.render("Products", {
            title: "All Products",
            products: products
        })
    })
}

module.exports.getProduct = (req, res) => {
    const {id} = req.params;
    products.findById(id)
    .then(product => {
        return res.json(product);
    }).catch(err => {
        console.error("Error to get product by id", err);
    })
}

module.exports.addProduct = (req, res) => {

    return res.render("AddProduct", {
        title: "Add Products"
    })
}


module.exports.createProduct = (req, res) => {

    products.imgesUpload(req, res, (err) => {
        if (err) {
            console.log("Multer error ", err);
        }
        let imagePath = [];
        console.log(req);

        if (req.files) {
            for (let i of req.files) {
                imagePath.push(products.PRODUCTS_PATH + "/" + i.filename)
            }
        }
        products.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            images: imagePath
        }).then(product => {
            console.log("new Product with image added", product);
        }).catch(err => {
            console.error("Error to add new product into db ", err);
        })
        return res.redirect("back");
    })
}

module.exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    products.findByIdAndDelete(id)
        .then(product => {
            console.log("Deleted Product is", product);
        }).catch(err => {
            console.error("Error to delete prodcut", err);
        })
    return res.redirect("back");
}

module.exports.editProduct = (req, res) => {
    const id = req.params.id;

    products.findById(id)
        .then(product => {
            return res.render("UpdateProduct", {
                title: "Update Product",
                product: product
            })
        }).catch(err => {
            console.error("error to load update page", err);
        })
}


module.exports.updateProduct = async (req, res) => {
    // products.findOne({ _id: req.body.id }).then(product => {
    //     console.log(imagePath, "imagepath")

    //     imagePath = (imagePath.length > 0) ? imagePath.concat(product.images) : product.images;
    //     console.log(product.images, "product images")
    //     console.log(imagePath.concat(product.images), "product com")

    //     products.updateOne({ _id: req.body.id }, {
    //         $set:
    //         {
    //             title: req.body.title,
    //             category: req.body.category,
    //             description: req.body.description,
    //             price: req.body.price,
    //             images: imagePath
    //         }
    //     }, { new: true }).then(product => {
    //         return res.redirect("back");

    //     }).catch(err => {
    //         console.error("Error to Updateproduct in db ", err);
    //     })
    // })

    try {
        products.imgesUpload(req, res, async (err) => {
            if (err) {
                console.log("Multer error ", err);
            }
            let imagePath = [];
            if (req.files) {
                for (let i of req.files) {
                    imagePath.push(products.PRODUCTS_PATH + "/" + i.filename)
                }
            }
            try {
                const product = await products.findOne({ _id: req.body.id })
                imagePath = imagePath.length > 0 ? imagePath.concat(product.images) : product.images
                    product.title = req.body.title,
                    product.category = req.body.category,
                    product.description = req.body.description,
                    product.price = req.body.price,
                    product.images = imagePath

                await product.save();
                return res.redirect("back");
            } catch (err) {
                console.error("Error to update product", err);

            }
        })
    } catch (err) {
        console.error("Error to update product", err);
    }
}

// module.exports.deleteImage = (req, res) => {
//     const { index, id } = req.query;
//     console.log(index)
//     console.log(id)

//     products.findOne({ _id: id }).then(product => {
//         product.update({
//             $set: {
//                 images: product.images.filter((image, i) => i !== index)
//             }
//         })
//         return res.redirect("back")
//     })
// }

module.exports.deleteImage = async (req, res) => {
    let { index, id } = req.query;
    index = parseInt(index, 10);
    try {
        const product = await products.findOne({ _id: id })
        console.log(product);

        product.images = product.images.filter((image, i) => i !== index);
        await product.save();
        console.log(product);
        return res.redirect("back");
    } catch (err) {
        console.error(" Error to update image ", err);
    }

}