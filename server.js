const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


app.use((req,res, next)=> {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
//I like this comment better :p


app.listen(9000, () => {
    console.log('Server running on port 9000')
})
//These are added test comments for git practice