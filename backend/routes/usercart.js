const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserCart = require('../models/UserCart');
const fetchuser = require('../middleware/fetchuser');
const AdminProducts = require('../models/AdminProducts');

// ROUTE 1:--> Get all the ordered products using: GET "/api/usercart/fetchcart". Login required.
router.get('/fetchcart', fetchuser, async (req, res) => {
    try {
        const cart = await UserCart.find({ user: req.user.id }); // It finds carts of the corresponding user.
        res.json(cart); // It send cart as a response.
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 2:--> Add cart using POST "/api/usercart/addcart". Login required.
router.post("/addcart/:id/:shoesize", fetchuser, [
], async (req, res) => {
    try { 
        // Finds the validation errors in this request and wraps them in an object with handy functions.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let product = await AdminProducts.findById(req.params.id);
        if (!product) {
            return res.status(401).send("Not found !!"); // Return not found if product not found.
        }

        // let alreadyInCart = await UserCart.find

        const cart = new UserCart({
            // Note:-> This way of creating object used when data is not de-structured.
            image: product.image,
            brand: product.brand,
            description: product.description,
            price: product.price,
            size: req.params.shoesize,
            user: req.user.id,
        });

        const savedcart = await cart.save();
        // res.json({ savedcart });



        // res.json({"ID of Product": req.params.id}); // This is for testing only.
        res.json({ "Product": product, savedcart }); // This is for testing only.
        // res.json({ "ID: ": req.params.id, "Size: ": req.params.size }); // This is for testing only.

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 3:--> Update the quantity using: PUT "/api/usercart/updatecart/:id". Login required.
router.put('/updatecart/:id', fetchuser, async (req, res) => {
    try {
        const { quantity } = req.body; // Here, we get the data using de-structuring.

        // Finds the validation errors in this request and wraps them in an object with handy functions.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let updated_cart = {};

        if (quantity) {
            updated_cart.quantity = quantity;
        }

        // Find the cart to be update and update it.
        let cart = await UserCart.findById(req.params.id); // It finds the product with params's admin id.

        // Below code will check the 
        if (!cart) {
            return res.status(401).send("Not found !!"); // Return not found if product not found.
        }

        // Below code verify the admin belongs to logged in admin or not.
        if (cart.user.toString() !== req.user.id) { // Here, we match the existing admin id with the logged in admin id.
            return res.status(404).send("Unauthorised access !!");
        }

        // console.log("req.user.id: " + req.admin.id); // This is for testing only.
        // console.log("cart.user: " + product.admin); // This is for testing only.
        // console.log("cart.user.toString(): " + product.admin.toString()); // This is for testing only.


        // -------------------------------------- Note For {new:true} ----------------------------------------
        // By default, findOneAndUpdate() returns the document as it was before update was applied.
        // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
        // ---------------------------------------------------------------------------------------------------

        // Note:-> Below line is without {new: true} so it shows "res.json" without updated. With {new:true} it shows updated "res.json(cart)".
        // cart = await UserCart.findByIdAndUpdate(req.params.id, {$set: updated_cart}); // Cart Updated.

        cart = await UserCart.findByIdAndUpdate(req.params.id, { $set: updated_cart }, { new: true }); // Cart Updated.
        res.json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 4:--> Delete the cart using: DELETE "/api/usercart/deletecart/:id". Login required.
router.delete("/deletecart/:id", fetchuser, async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array()); // This is for testing only.
            return res.status(400).json({ errors: errors.array() });
        }

        let cart = await UserCart.findById(req.params.id);

        if (!cart) {
            return res.status(401).send("Not Found"); // It means 404 "Not Found".
        }
        // Below code will verify the admin belongs to the logged in admin or not.
        if (cart.user.toString() !== req.user.id) {
            return res.status(404).send("Unauthorised access !!");
        }

        cart = await UserCart.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Product has been deleted successfully.", cart: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error.");
    }
});

module.exports = router;