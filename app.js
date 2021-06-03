const express = require('express')
const app = express()

const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')


// Importing routes
const employeeRoutes = require('./routes/employees')


dotenv.config({path: './config.env'})

// Connecting to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('views, path', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

// middleware to connect flash
app.use(flash())

//middleware for express session 
app.use(session ({
    secret: 'myfirstdatabase',
    resave: true,
    saveUninitialized: true
}))

//  Setting messares variable for flash globally
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'))
    res.locals.error_msg = req.flash(('error_msg'))
    next()
})

// middleware for method override
app.use(methodOverride('_method'))

// Using routes
app.use(employeeRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log('Server started at port 3000')
})