const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//set
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Use

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

// Get

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ruben Virduzzo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        msg: 'Create by Ruben Virduzzo',
        image: 'img/foto.jpeg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Helpfull text!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    

    geocode(req.query.address, (error ,{latitud, longitud, location} = {}) => {

        if (error) {
            return res.send(error)
        } 

        forcast(latitud, longitud, (error, {icon, forecast, temperature, feelslike} = {}) => {
            if (error) {
                return res.send(error)
            } 
            
            res.send({
                icon,
                forecast,
                temperature,
                feelslike,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('*', (req, res) => {
    res.render('404-error', {
        title: 'Page not found'
    })
})

// Listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})