const path = require('path')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const express = require('express');
const hbs = require('hbs');

const app = express()

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mekre Abate'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mekre Abate'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How can I assist you?',
        name: 'Mekre Abate',
        title: 'Help'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

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
    res.render('nothing', {
        name: 'Mekre Abate',
        title: 'Help',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('nothing', {
        name: 'Mekre Abate',
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})