const User = require("../models/user");
const jwt = require("json-web-token");

async function defineCurrentUser(req, res, next) {
    try {
        if (req.headers.authorization) {
            const [ method, token ] = req.headers.authorization.split(' ')
                if( method == 'Bearer' ){
                    const result = await jwt.decode(process.env.JWT_SECRET, token)
                    const id = result.value._id
                    let user = await User.findOne({_id: id})
                    req.currentUser = user
                    // console.log(req.currentUser)
                }
            }
        next()
    } catch (err) {
        res.send(err)
        next()
    }
}

module.exports = defineCurrentUser;