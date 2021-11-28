const request = require('postman-request')
require('./stringutils.js')

const weatherstackAPIBaseURL = 'http://api.weatherstack.com/current'
const weatherstackAPIKey = 'feee913d438aafa27dcd5d62085c1c81'

const forecast = (lat, long, callback) => {
    // debugger
    const url = weatherstackAPIBaseURL + '?access_key=' + weatherstackAPIKey + '&query=' + lat + ',' + long
    request({ url, json: true },
        (error, { body: apiData } = {}) => {
            if (error) {
                callback('Unable to connect to weather service', undefined)
            } else if (apiData.error) {
                callback(apiData.error.info, undefined)
            } else {
                const temp = apiData.current.temperature
                const feelsLike = apiData.current.feelslike
                const weatherDescription = apiData.current.weather_descriptions[0]
                const forecastText = '{0}: It is currently {1} degrees out. It feels like {2} degrees.'.format(weatherDescription, temp, feelsLike)

                callback(undefined, forecastText)
            }
        }
    )
}

module.exports = forecast
