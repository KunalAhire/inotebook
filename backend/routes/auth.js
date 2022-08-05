const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Kunal@hire';
var fetchuser = require('../middleware/fetchuser');

let success = false;
//for creating user
router.post('/createuser', [
    body('name', 'Invalid Name').isLength({ min: 3 }),
    body('email', 'enter valid mail').isEmail(),
    body('password', 'Password must be 5 lenght').isLength({ min: 5 }),
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json('email address is alredy exist');
            }
            var salt = await bcrypt.genSaltSync(10);
            var secpass = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass,

            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            res.json({success, authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('internal server error')
        }

    },
)
//for login user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ error: "email or password are wrong" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "email or password are wrong" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success=true
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success, authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})

//router 3 Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;