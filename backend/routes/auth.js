const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "nsf4CQunzDPD4kJfjIJT6iTN"
const userId=""


// Route 1
router.post("/createuser", [body('name', "Enter a valid name").isLength({ min: 3 }), body('email', "Enter a valid email").isEmail(), body('password').isLength({ min: 5 }, 'Password must at least 5 chat')], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email is already exist" })
        }

        // const user = User(req.body)
        // user.save()
        const salt = await bcrypt.genSaltSync(10);
        const secPasswd = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPasswd

        })
        // .then(user => res.json(user)).catch(err => { res.json({ error: "Please Enter a unique value for email", message: err['errmsg'] }) })
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_SECRET)
        res.set('Cookie', jwtData)
        res.json({ jwtData })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some Error Occured")
    }

})

// Route 2
router.post("/login", [body('email', "Enter a valid email").isEmail(), body('password', 'Password cannot be black').exists()], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Username oR Password is wrong" })
        }
        const passwordCompare =  await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Username oR Password is wrong" })

        }
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_SECRET)
        res.set('Set-Cookie', jwtData)
        res.json({ jwtData })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }


})

// Route 3
router.post('/check' , async(req,res)=>{
    try {
        try {
            token = req.header('cookie').split("=")[1]
        } catch (error) {
            token=null
        }
        // console.log(token)
        
        if (!token) {
            return res.status(401).send({ error: "Access Denied" })
        }
        try {
            var decoded = await jwt.verify(token, JWT_SECRET);
            req.user = decoded.user
        } catch (error) {
            res.status(401).send({ error: "Access Denied " + error })
        }

        const user = await User.findById(req.user.id).select("-password")
        console.log(user)
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router