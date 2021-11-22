const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDir = path.join(__dirname, '..', '/public')
const viewsPath = path.join(__dirname, '..', '/templates/views')
const partialsPath = path.join(__dirname, '..', '/templates/partials')
const app = express()

//Set up handlebars view engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up public directory for serving up static data
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'The Index homepage',
        author: 'Jonathan Buckle'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this weather app',
        author: 'Jonathan Buckle'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        author: 'Jonathan Buckle',
        helpMessage: 'It is so embarrassing that you needed to look at the help screen...'
    })
})

app.get('/weather', ({ query } = {}, res) => {
    if (!query.address) {
        return res.send({
            error: 'Please provide a location'
        })

    } else {
        //Retrieve lat and long from location query
        geocode(query.address, 1, (error, { lat, long, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            //Forecast for address found in geocode
            forecast(lat, long, (forecasterror, forecastdata) => {
                if (forecasterror) {
                    return res.send({
                        error: forecasterror
                    })
                }
                return res.send({
                    location,
                    forecastdata
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Jonathan Buckle',
        errorMsg: 'Could not find this help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Jonathan Buckle',
        errorMsg: 'Welp - this is embarrassing...'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
