const request = require('request')

const forecast = (lattitude, longitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=85e623ad902d80b1a849da307141c077&query=' + lattitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)   
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.feelslike + ' degree out.')            
        }
    })

}

module.exports = forecast