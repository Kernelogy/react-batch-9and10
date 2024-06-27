const express = require("express")
const app = express()

app.use(express.urlencoded())
app.use(express.json())

const cors = require("cors")
app.use(cors())


const mongoose = require("mongoose")
const MONGODB_URL = "mongodb://127.0.0.1:27017/bookhub004"

const UserRoute = require("./routes/UserRoute")
app.use(UserRoute)
const AuthMiddleware = require("./middlewares/AuthMiddleware")

app.get("/unprotected", AuthMiddleware.verifyToken, (req, res)=>{
    res.send("Unprotected URL token not needed")
})
app.get("/protected", AuthMiddleware.verifyToken, (req, res)=>{
    res.send("Protected URL token needed")
})

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log("DB Connection Succeeded...")
    })
    .catch((err)=>{
        console.log("DB Connection Failed...", err)
    })

app.listen(4040, ()=>{
    console.log("Server Listening on Port 4040")
})

















// mongoose.connect(MONGODB_URL)
//     .then(()=>{
//         console.log(`${MONGODB_URL} connection Successfull...`)
//     })
//     .catch((err)=>{
//         console.error("Error in connecting to mongodb", err.message)
//     })