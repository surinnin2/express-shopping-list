const express = require('express')
const app = express()
const itemsRoutes = require('./routes/items')
const CustomError = require('./customError')

app.use(express.json());
app.use("/items", itemsRoutes)

//404 handler
app.use(function(req, res, next) {
    return new CustomError('Not Found', 404)
})

//general err handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)

    return res.json({
        error: err.message
    })
})

module.exports = app