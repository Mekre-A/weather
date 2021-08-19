const request = require('postman-request');



const forecast = (longitude, latitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=4722c2015c4ad533dbc675a92cbca0b4&query=${longitude},${latitude}&units=f`;

    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} but it feels like ${body.current.feelslike}. This is also the wind speed ${body.current.wind_speed}`)
        }
    })
}


module.exports = forecast;