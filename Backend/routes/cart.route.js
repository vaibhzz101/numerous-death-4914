const express = require('express')
// const controller = require("../controller/cart.controller")
const CartModel = require('../model/cart.model');
const cartRouter = express.Router();

// get
cartRouter.get('/', async (req, res) => {
    try {
        const products = await CartModel.find({ userID: req.body.userID })
        res.json(products)
    } catch (error) {
        res.json({ msg: error.message })
    }
})

// post
cartRouter.post('/add', async (req, res) => {
    const productdata = req.body;
    try {
        const product = await CartModel.find({ product_id: productdata.product_id })
        // if product exist
        if (product.length > 0) {
            return res.status(400).json({ msg: "product already exists" })
        }
        // add product
        const newproduct = new CartModel(productdata)
        await newproduct.save()
        res.json({ msg: " product added to cart" })

    } catch (error) {
        res.json({ msg: error.message })
    }
} )

// delete
cartRouter.delete('/delete/:id', async (req, res) => {
    const _id = req.params.id;
    const userID = req.body.userID;
    const product = await CartModel.find({ _id })
    console.log(userID, product);
    try {
        if (userID !== product[0].userID) {
            res.json({ msg: "user is not authorised" })
        }
        else {
            await CartModel.findByIdAndDelete({ _id })
            res.json({ msg: "product has been deleted" })
        }

    } catch (error) {

        res.json({ msg: error.message })
    }
})







module.exports = { 
    cartRouter }
