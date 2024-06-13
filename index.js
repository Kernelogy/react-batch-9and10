const express = require("express")

const app = express()

// Http Method, URL
app.get("/sayHi", (req, res)=>{
    res.send("3.14")
})

app.get("/html", (req, res)=>{
    const html = `
        <div>
            Username : <input type="text" /> <br>
            Password : <input type="text" /> <br>
            <input type="button" value="Signin" />
        </div>    
    `
    res.send(html)
})

app.get("/json", (req, res)=>{
    const user = {
        username: "Mukil",
        id: "123",
        gender: "Male"
    }
    res.send(user)
})
// http://localhost:3000/signin?username=mukilan&password=12345

app.get("/signin", (req, res)=>{
    // const username = req.query.username
    // const password = req.query.password
    const username = req.query["username"]
    const password = req.query["password"]
    if(username === "admin" && password ==="12345"){
        res.send("Login Success")
    }
    res.send("Login Failed")
})

app.use(express.urlencoded())
app.use(express.json())

const siginRouter = require("./routes/sigin")
app.use(siginRouter)



const posts = [
    {
        id: 1,
        title: "The new AI era",
        desc: "Some Lengthy description for the post",
        author: "Mukilan"
    },
    {
        id: 2,
        title: "How to use python for machine learning",
        desc: "Some Lengthy description for the post",
        author: "Manu"
    },
    {
        id: 3,
        title: "The emergence of graphics card",
        desc: "Some Lengthy description for the post",
        author: "Anbu"
    }
]

const levelOne = (req,res,next)=>{
    console.log("Level One /post/" + req.params.id, new Date())
    next()
}

const levelTwo = (req,res,next)=>{
    console.log("Level Two /post/:id", new Date())
    next()
}

const levelThree = (req,res,next)=>{
    console.log("Level Three /post/:id", new Date())
    next()
}

app.get("/post/:id", [
    levelOne, levelTwo, levelThree,
    (req,res)=>{
        console.log("Sending Data")
        let id = req.params.id
        res.send(posts[id])
    }
])


app.use("/static", express.static(__dirname + "/files"))


app.listen(3000, ()=>{
    console.log("Server Listening....")
})


