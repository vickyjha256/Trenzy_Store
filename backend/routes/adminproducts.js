const express = require('express');
const router = express.Router();
const fetchadmin = require('../middleware/fetchadmin');
const AdminProducts = require('../models/AdminProducts');
const { body, validationResult } = require('express-validator');

// ROUTE 1:--> Get all the products using: GET "/api/adminproducts/getproducts". No Login required.
// router.get('/getproducts', fetchadmin, async (req, res) => {
router.get('/getproducts', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find(); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 2:--> Add products using POST "/api/adminproducts/addproducts". Login required.
router.post("/addproducts", fetchadmin, [
    // body('image', "Please enter a image link.").isString().isURL(),
    // body('brand', "Please enter a brand name !!").isString().isLength({ min: 2 }),
    // body('description', "Please enter description for product.").isLength({ min: 5 }),
    // body('type', "Enter type of shoe whether it's casual, formal, ethnic.").isString(),
    // body('gender', "Enter the gender for product.").isString(),
    // body('price', "Enter the price of product.").isInt(),
    // body("availability", "Enter in stock or out of stock.").exists(),
], async (req, res) => {
    try {
        const { image, brand, description, type, gender, price, availability } = req.body; // Here, we get the data using de-structuring.

        // Finds the validation errors in this request and wraps them in an object with handy functions.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const adminproduct = new AdminProducts({
            // Note:-> Below we used the data like this way because data is de-structured above.
            // Here, we are also saving admin id so that we can find products stored by which admin.
            image, brand, description, type, gender, price, availability, admin: req.admin.id


            // Note:-> This way of creating object used when data is not de-structured.
            // image: req.body.image,
            // brand: req.body.brand,
            // description: req.body.description,
            // price: req.body.price,
            // availability: req.body.availability,
            // admin: req.admin.id,
        });

        const savedAdminProduct = await adminproduct.save();
        res.json(savedAdminProduct);
        // res.json({ savedAdminProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 3:--> Update the products using: PUT "/api/adminproducts/update/:id". Login required.
router.put('/updateproduct/:id', fetchadmin, async (req, res) => {
    try {
        const { image, brand, description, type, gender, price, availability } = req.body; // Here, we get the data using de-structuring.

        // Finds the validation errors in this request and wraps them in an object with handy functions.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let updated_product = {};
        if (image) {
            updated_product.image = image;
        }
        if (brand) {
            updated_product.brand = brand;
        }
        if (description) {
            updated_product.description = description;
        }
        if (type) {
            updated_product.type = type;
        }
        if (gender) {
            updated_product.gender = gender;
        }
        if (price) {
            updated_product.price = price;
        }
        if (availability) {
            updated_product.availability = availability;
        }

        // Find the product to be update and update it.
        let product = await AdminProducts.findById(req.params.id); // It finds the product with params's admin id.

        // Below code will check the 
        if (!product) {
            return res.status(401).send("Not found !!"); // Return not found if product not found.
        }

        // Note:-> We commented below code of verifying admin so that any admin can update the product.
        // Below code verify the admin belongs to logged in admin or not.
        // if (product.admin.toString() !== req.admin.id) { // Here, we match the existing admin id with the logged in admin id.
        //     return res.status(404).send("Unauthorised access !!");
        // }

        // console.log("req.admin.id: " + req.admin.id); // This is for testing only.
        // console.log("product.admin: " + product.admin); // This is for testing only.
        // console.log("product.admin.toString(): " + product.admin.toString()); // This is for testing only.


        // -------------------------------------- Note For {new:true} ----------------------------------------
        // By default, findOneAndUpdate() returns the document as it was before update was applied.
        // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
        // ---------------------------------------------------------------------------------------------------

        // Note:-> Below line is without {new: true} so it shows "res.json" without updated. With {new:true} it shows updated "res.json(product)".
        // product = await AdminProducts.findByIdAndUpdate(req.params.id, {$set: updated_product}); // Product Updated.

        product = await AdminProducts.findByIdAndUpdate(req.params.id, { $set: updated_product }, { new: true }); // Product Updated.
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 4:--> Delete the products using: DELETE "/api/adminproducts/deleteproduct/:id". Login required.
router.delete("/deleteproduct/:id", fetchadmin, async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array()); // This is for testing only.
            return res.status(400).json({ errors: errors.array() });
        }

        let product = await AdminProducts.findById(req.params.id);

        if (!product) {
            return res.status(401).send("Not Found"); // It means 404 "Not Found".
        }

        // Note:-> We commented below code of verifying admin so that any admin can delete the product.
        // Below code will verify the admin belongs to the logged in admin or not.
        // if (product.admin.toString() !== req.admin.id) {
        //     return res.status(404).send("Unauthorised access !!");
        // }

        product = await AdminProducts.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Product has been deleted successfully.", product: product });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 5:--> Get Men products using: GET "/api/adminproducts/menitems". No Login required.
router.get('/menitems', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Male" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 6:--> Get Casual Men products using: GET "/api/adminproducts/casualmen". No Login required.
router.get('/casualmen', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Male", type: "Casual" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 7:--> Get Formal Men products using: GET "/api/adminproducts/formalmen". No Login required.
router.get('/formalmen', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Male", type: "Formal" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 8:--> Get Ethnic Men products using: GET "/api/adminproducts/ethnicmen". No Login required.
router.get('/ethnicmen', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Male", type: "Ethnic" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 9:--> Get Women products using: GET "/api/adminproducts/womenitems". No Login required.
router.get('/womenitems', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Female" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 10:--> Get Casual Women products using: GET "/api/adminproducts/casualwomen". No Login required.
router.get('/casualwomen', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Female", type: "Casual" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 11:--> Get Formal Women products using: GET "/api/adminproducts/formalwomen". No Login required.
router.get('/formalwomen', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Female", type: "Formal" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 12:--> Get Ethnic Women products using: GET "/api/adminproducts/ethnicwomen". No Login required.
router.get('/ethnicwomen', async (req, res) => {
    try {
        // const products = await AdminProducts.find({ admin: req.admin.id }); // It finds products of the corresponding admin.
        const products = await AdminProducts.find({ gender: "Female", type: "Ethnic" }); // It finds products of the corresponding admin.
        res.json(products); // It send products as a response.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});


module.exports = router;