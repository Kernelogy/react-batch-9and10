const User = require("../models/UserModel")
const { validationResult} = require("express-validator")
const UserValidator = require("../validators/UserValidator")
const bcrypt = require("bcrypt")

exports.insert = [
    UserValidator.validateInsert,
    async (req, res)=>{   
        const errors = validationResult(req)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        if(errors.isEmpty()){
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                contact: req.body.contact,
                password: hashedPassword
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
const jwt = require("jsonwebtoken")
exports.login = [
    async (req, res) => {
        const username = req.body.username
        const password = req.body.password
        
        User.findOne({
            username: username
        })        
        .then(async (user)=>{
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                const token = jwt.sign({ 
                    userId: user._id,
                    username: user.username,
                    email: user.email
                 }, 'this-can-be-any-random-key', {
                    expiresIn: '1h',
                })
                res.send({
                    userFound: true,
                    token: token
                })
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


