const User = require("../models/UserModel")
const { validationResult} = require("express-validator")
const UserValidator = require("../validators/UserValidator")


exports.insert = [
    UserValidator.validateInsert,
    (req, res)=>{   
        const errors = validationResult(req)
        if(errors.isEmpty()){
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                contact: req.body.contact,
                password: req.body.password
            })
    
            user.save()
                .then((ele)=>{
                    res.send(ele)
                })
                .catch((err)=>{
                    res.send(err)
                })
        }else{
            res.send(errors)
        }     
    }
]

exports.list = [
    (req, res) => {
        User.find()
            .then((users)=>{
                res.send(users)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
]

exports.login = [
    (req, res) => {
        const username = req.body.username
        const password = req.body.password
        User.findOne({
            username: username,
            password: password
        })
        .then((user)=>{
            if(user){
                res.send({userFound: true})
            }else{
                res.send({userFound: false})
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    }
]

exports.update = [
    (req, res) => {

        User.updateOne(
            {_id: req.params.id},  //search this 
            {$set: {
                username: req.body.username,
                email: req.body.email,                  //Update this
                contact: req.body.contact,
                password: req.body.password
            }})
            .then((user)=>{
                res.send(user)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
]

exports.delete = [
    (req, res) => {
        User.deleteOne({_id: req.params.id})
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
]


