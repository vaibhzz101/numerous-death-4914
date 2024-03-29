const UserModel = require('../models/user.model')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const jwtkey = process.env.jwtkey;

exports.register = async (req, res) => {
    const { name, email, gender, password } = req.body;

    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) return res.json({ err: "user aleady presnt " })
        // add user and bcrypt password
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err.message })
            }
            else {
                const user = new UserModel({ name, email, gender, password: hash })
                await user.save();
                console.log(user);
                res.status(200).json({ msg: "user registred" })
            }
        })


    } catch (error) {
        res.status(400).json({ err: error.message })
    }

}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        console.log(user);
        if (user.length !== 0) {
            await bcrypt.compare(password, user[0].password, (err, success)=>{
                if(success){
                    token = jwt.sign({ userID: user[0]._id }, jwtkey, { expiresIn: '24h' })
                    // token sent
                    res.json({ "message": "login success", "Token" : `${token}` })
                } else {


                    res.status(403).send({ "message": "Invalid Credentials"})
                }
            })
        }
        else{
            res.send('Wrong credentails')
        }
    } catch (error) {
        res.json({error : error.message })
    }
}


exports.allusers = async (req, res) => {
    try {
        const users = await UserModel.find()
        if (users) res.json(users)
        else{
            res.send('No users found')
        }
    } catch (error) {
        res.json({error : error.message })
    }
}