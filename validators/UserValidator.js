const User = require("../models/UserModel")
const {body, validationResult} = require("express-validator")

exports.validateInsert = [
    body("username").trim().isLength({min: 5}).withMessage("Username must be above 5 characters"),
    body("email").trim().isEmail().withMessage("Provide a valid email id"),
    body("username").trim().isLength({min: 5}).withMessage("Username alredy exists")
    .custom((value)=>{
        return User.findOne({username: value})
                .then((user)=>{
                    if(user){
                        return Promise.reject("Username already exists")
                    }
                })
    })
]