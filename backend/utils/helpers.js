const jwt = require("jsonwebtoken")

exports = {}

exports.getToken = async(userName, user) => {
    const token = jwt.sign({sub: user._id}, "123")
    return token
}
exports.getTokenEmail = async(email, user) => {
    const token = jwt.sign({sub: user._id}, "123")
    return token
}

module.exports = exports