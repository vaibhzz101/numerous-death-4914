const productData = require('../config/productData')    
const ProductModel = require('../models/product.model')

// getall
exports.getall = async(req,res) =>{
    let products;
    const _id = req.params.id;
    
    // take out key from query
    let objKey;
    for( key in req.query ) objKey = key

    try {
        if (_id)  products = await ProductModel.find({_id})
        else  products = await ProductModel.find({[objKey] : {$regex: req.query[objKey],$options:'i'}})
        res.json(products)
    } catch (error) {
        res.json({msg : error.message})
    }
}
// filter
exports.filterproducts = async(req,res) =>{
    // take out key from query
    let objKey;
    for( key in req.query ) objKey = key
    try {
        const products = await ProductModel.find().sort({[objKey]:1})
        res.json(products)
    } catch (error) {
        res.json({msg : error.message})
    }
}



//  admin access
exports.create = async(req,res) =>{
    try {
        const newproduct = new ProductModel(req.body)
        await newproduct.save()
        res.json({msg :" product created" })
        
    } catch (error) {
        res.json({msg : error.message })
    }
}
// update
exports.update = async(req,res) =>{
    const payload = req.body;
    const _id = req.params.id;
    const userID = req.body.userID;
    
    const product = await ProductModel.find({_id})
    
    try {
        if(userID !== product[0].userID){
            res.json({msg : "usernote authorised"})
        }
        else{
            const data  = await ProductModel.findByIdAndUpdate({_id},payload)
            res.json({msg : "product updated"})
        }
        
    } catch (error) {
        
        res.json({msg : error.message})
    }
}
// delete
exports.delete = async(req,res) =>{
    const payload = req.body;
    const _id = req.params.id;
    const userID = req.body.userID;
    
    const product = await ProductModel.find({_id})
    
    try {
        if(userID !== product[0].userID){
            res.json({msg : "usernote authorised"})
        }
        else{
             await ProductModel.findByIdAndDelete({_id})
            res.json({msg : "product deleted"})
        }
        
    } catch (error) {
        
        res.json({msg : error.message})
    }
}




// server add

exports.addAllProduct= async(req,res) =>{
    
    try {
       
        
        await ProductModel.insertMany(productData)
        res.json({msg :" product created" })
        
    } catch (error) {
        res.json({msg : error.message })
    }
   
}