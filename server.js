const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")
const server = express();
const profileRouter = require("./routes/profileRouter")
const postRouter = require("./routes/postRouter")

server.set("port", process.env.PORT || 4000)
server.use(cors())

server.use(bodyParser.json())
server.use(passport.initialize()) 
server.use("/profile",profileRouter)
server.use("/post",postRouter)

mongoose.connect("mongodb+srv://diegostriveschool:h6nxg5U9SDcsLA26@cluster0-3ar0p.azure.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(
  server.listen(server.get('port'), () => {
      console.log("SERVER IS RUNNING ON " + server.get("port"))
  })
).catch(err => console.log(err))

