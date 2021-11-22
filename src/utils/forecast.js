const request = require('postman-request')

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

                callback(undefined, 'It is currently ' + temp + ' degrees out. It feels like ' + feelsLike + ' degrees out!')
            }
        }
    )
}

module.exports = forecast
