const express = require("express")
const router = express.Router()

router.get("/signin", (req, res)=>{
    // const username = req.query.username
    // const password = req.query.password
    const username = req.query["username"]
    const password = req.query["password"]
    if(username === "admin" && password ==="12345"){
        res.send("Login Success")
    }
    res.send("Login Failed")
})

router.post("/signin", (req, res)=>{
    const username = req.body.username 
    const password = req.body.password
    console.log(username + " " + password)
    if(username === "admin" && password ==="12345"){
        res.send("Login Success")
    }else{
        res.send("Login Failed")
    }    
})

module.exports = router