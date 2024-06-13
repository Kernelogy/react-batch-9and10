const express = require("express")
const app = express()

app.use(express.urlencoded())
app.use(express.json())


const mongoose = require("mongoose")
const MONGODB_URL = "mongodb://127.0.0.1:27017/bookhub003"

const UserRoute = require("./routes/UserRoute")
app.use(UserRoute)

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log("DB Connection Succeeded...")
    })
    .catch((err)=>{
        console.log("DB Connection Failed...", err)
    })

app.listen(3000, ()=>{
    console.log("Server Listening on Port 3000")
})

















// mongoose.connect(MONGODB_URL)
//     .then(()=>{
//         console.log(`${MONGODB_URL} connection Successfull...`)
//     })
//     .catch((err)=>{
//         console.error("Error in connecting to mongodb", err.message)
//     })