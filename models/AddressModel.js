const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({
    plotNo: {type: String, required: true},
    street: {type: String, required: true},
    landmark: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    pincode: {type: String, required: true}
})

const AddressModel = mongoose.model("Address",AddressSchema)

module.exports = AddressModel
