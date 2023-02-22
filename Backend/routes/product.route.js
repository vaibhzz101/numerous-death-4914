const express = require('express');
// const controller = require('../controller/product.controller');
const ProductModel = require('../model/product.module')
const productRouter = express.Router();

// get
// productRoute.get('/', controller.getall);
// productRoute.get('/filter', controller.filterproducts)
// productRoute.get('/:id', controller.getall )

// // post
// productRoute.post('/add', controller.create )
// productRoute.post('/addProductData', controller.addProductData) 

// // patch
// productRoute.patch('/update/:id', controller.update )

// // delete
// productRoute.delete('/delete/:id', controller.delete )

const pData = require('../config/pData')

// get products 
productRouter.get("/", async (req, res) => {
    let products;
    const _id = req.params.id;
    let objKey;
    for (key in req.query) objKey = key
    try {
        if (_id) products = await ProductModel.find({ _id })
        else products = await ProductModel.find({ [objKey]: { $regex: req.query[objKey], $options: 'i' } })
        res.send(products)
    } catch (error) {
        res.send({ msg: error.message })
    }
})

// Filter
productRouter.get("/filterproducts",  async (req, res) => {

    let objKey;
    for (key in req.query) objKey = key
    try {
        const products = await ProductModel.find().sort({ [objKey]: 1 })
        res.send(products)
    } catch (error) {
        res.send({ msg: error.message })
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Admin Access

// create from admin side
productRouter.post("/add",async (req, res) => {
    try {
        const newproduct = new ProductModel(req.body)
        await newproduct.save()
        res.json({ msg: "Product has been created" })

    } catch (error) {
        res.json({ msg: error.message })
    }
})

// update from admin side
productRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const _id = req.params.id;
    const userID = req.body.userID;

    const product = await ProductModel.find({ _id })

    try {
        if (userID !== product[0].userID) {
            res.send({msg:"user is not authorised" })
        }
        else {
           await ProductModel.findByIdAndUpdate({ _id }, payload)
            res.send({ msg: "product updated" })
        }

    } catch (error) {

        res.send({ msg: error.message })
    }
})

// delete from admin side
productRouter.delete("/delete/:id", async (req, res) => {
   
    const _id = req.params.id;
    const userID = req.body.userID;

    const product = await ProductModel.find({ _id })

    try {
        if (userID !== product[0].userID) {
            res.send({ msg: "user is not authorised" })
        }
        else {
            await ProductModel.findByIdAndDelete({ _id })
            res.send({ msg: "product has been deleted" })
        }

    } catch (error) {

        res.send({ msg: error.message })
    }
})

//  adding data to server
productRouter.post("/addProductData", async (req, res) => {

    try {
        await ProductModel.insertMany(pData)
        res.json({ msg: " products has been added" })

    } catch (error) {
        res.json({ msg: error.message })
    }

})




// export

module.exports={
    productRouter
}