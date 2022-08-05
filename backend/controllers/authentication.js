const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token")

router.post("/", async (req, res) => {
    const user = await User.findOne({
          email: req.body.email 
    });

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.status(404).json({ message: "Could not find a user with the provided email and password" });
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { _id: user._id })
        res.json({ user: user, token: result.value });
    };
});

// router.post("/logout", (req, res) => {
//     req.currentUser = null
//     res.status(200).json(req.currentUser)
// })

router.get('/profile', async (req, res) => {
    // res.setHeader('Authorization', 'Bearer')
    try {
        // console.log("req.currentUser", req.currentUser)
        // res.json(req.currentUser)
    } catch (err) {
        console.log(err)
        // res.send(err.message)
    }
})

module.exports = router;