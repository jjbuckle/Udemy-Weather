const request = require('postman-request')

const mapboxAPIBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
const mapboxAPIKey = 'pk.eyJ1IjoiampidWNrbGUiLCJhIjoiY2t3Mm1kMDlvMWdrbTJubnR5c3M3NWkyOCJ9.HNjb7xNYkUR12Do477TE7Q'

const geocode = (address, limit, callback) => {
    const url = mapboxAPIBaseURL + '/' + encodeURIComponent(address) + '.json?access_token=' + mapboxAPIKey + '&limit=' + limit
    request({ url, json: true },
        (error, { body: apiData } = {}) => {
            if (error) {
                callback('Unable to connect to MapBox service', undefined)
            } else if (apiData.features.length === 0) {
                callback('No results found for \'' + apiData.query + '\'', undefined)
            } else {
                const location = apiData.features[0].place_name
                const lat = apiData.features[0].center[1]
                const long = apiData.features[0].center[0]

                callback(undefined, {
                    location: apiData.features[0].place_name,
                    lat: apiData.features[0].center[1],
                    long: apiData.features[0].center[0]
                })

            }
        }
    )
}

module.exports = geocode
