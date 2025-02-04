require('dotenv').config() // .env file to store sensitive information and not display it hardcoded

const express = require('express')

//create object for db
const mongoose = require('mongoose')

//use routes from routes folder
const postRoutes = require('./routes/post')

// forumApp by invoking express function
const forumApp = express()

//middleware
forumApp.use(express.json())
// if there is a body in api request, will be passed to req object in the middleware (for sending data esp in post/patch)
forumApp.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
forumApp.use('/api/post', postRoutes) //connecting to routes/post file

//connext to db thorugh the object
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests once connected to db
    forumApp.listen(process.env.PORT, () => {
    console.log('Connected to db & Listening on port', process.env.PORT)
})
})
.catch((error) => {
    console.log(error)
})