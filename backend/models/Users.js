const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    nameEmail: {
        type: String,
        required: false
    }
})

const UserModal = mongoose.model("User", UserSchema)

module.exports = UserModal