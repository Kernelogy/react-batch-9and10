const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    data: {type: String, required: true},
    type: {type: String, required: true},
    active: {type: Boolean, required: true}
}, {timestamps: true})

const ContactModel = mongoose.model("Contact", ContactSchema)

module.exports = ContactModel