const express = require('express')
const app = express()

const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Importing routes
const employeeRoutes = require('./routes/employees')


dotenv.config({path: './config.env'})

// Connecting to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('views, path', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Using routes
app.use(employeeRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log('Server started at port 3000')
})