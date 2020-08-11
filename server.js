const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


app.use((req,res, next)=> {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})//along with proxy in package.json, allows browser to take cross-origin servers
//seths comment

app.listen(9000, () => {
    console.log('Server running on port 9000')
})
//These are added test comments for git practice