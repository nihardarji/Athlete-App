const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const multer = require('multer')
const fs = require('fs')

const app = express()

connectDB()


app.use( express.json({ extended: false }))

// Define Routes
app.use('/api/athlete', require('./routes/athletes'))
app.use('/uploads',express.static('uploads'))

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    
    app.use('*', ( req, res ) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))