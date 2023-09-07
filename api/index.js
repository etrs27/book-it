const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./models/User")
const cookiesParser = require("cookie-parser")
require("dotenv").config()

const app = express()
const bcryptSalt = bcrypt.genSaltSync(12)
const jwtSecret = "gosgo58368gergk23"

app.use(express.json())
app.use(cookiesParser())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

mongoose.connect(process.env.MONGO_URL)

app.get("/test", (req, res) => {
  res.json("test okay!")
})

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const registrationInfo = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(registrationInfo)
  } catch (e) {
    res.status(422).json(e)
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const loginInfo = await User.findOne({ email })
  if (loginInfo) {
    const pwMatch = bcrypt.compareSync(password, loginInfo.password)
    if (pwMatch) {
      jwt.sign(
        { email: loginInfo.email, id: loginInfo._id },
        jwtSecret,
        (err, token) => {
          if (err) throw err
          res.cookie("token", token).json(loginInfo)
        }
      )
    } else {
      res.status(422).json("Not found")
    }
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else {
    res.json(null)
  }
})

app.listen(4000)
