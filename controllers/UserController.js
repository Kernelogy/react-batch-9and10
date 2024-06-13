const User = require("../models/UserModel")


exports.insert = [
    (req, res)=>{
        
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

