const express = require('express')
const { UserModel } = require('../model/user.model')
// const controller = require('../controller/user.controller')


require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtkey = process.env.jwtkey;
const userRouter = express.Router();

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REGISTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find()
        if (users) res.json(users)
        else {
            res.send('user does not exist')
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})
userRouter.post("/register", async (req,res) => {
    const {name,email,password,gender,phone,age} = req.body;
    try {
        const user = await UserModel.find({ email })
        // if user present already
        if (user.length > 0) 
            return res.send({ err: 'user already exist, Please login...' })
        
        // then add user and hash password to keep it secured
        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err.message })
            }
            // registerd 
            else {
                const user = new UserModel({name,email, password:hash,phone,gender, age,})
                await user.save();
                console.log(user);
                res.status(200).json({ msg: "user registerd successfully" })
            }
        })

    }
    // if any error
    catch (error) {
        res.status(400).json({ err: error.message })

    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

userRouter.post("/login", async (req, res) => {
    const {email,password} = req.body
    try {
        const user = await UserModel.find({email})
        console.log(user);
        if (user.length > 0) {
            // compare password exist with enter
            await bcrypt.compare(password, user[0].password, (err, success) => {
                // sign through jwt
                if (success) {
                    const token = jwt.sign({ userID: user[0]._id }, jwtkey, { expiresIn: '1h' })
                    // login success & sent token 
                    res.send({ "message": "login success", "Token": token })
                }
                // if invalid input
                else {
                    res.send({ "message": "Wrong Credentials" })
                }
            })
        }
        else {
            res.send('Wrong credentails')
        }
    } catch (error) {
        res.send({ error: error.message })
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GET ALL USERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// access controller
// userRoute.post('/register', controller.register)
// userRoute.post('/login', controller.login)

// export
module.exports={
    userRouter
}