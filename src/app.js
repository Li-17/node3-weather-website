const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Li'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'about me',
       name: 'Li' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helptext: 'Help Text',
        name: 'Li Yong'
    })
})
app.get('', (req, res)=> {
    res.send('<h1>weather</h1>')
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
   

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => { 
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longtitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Li',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Li',
        error: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})