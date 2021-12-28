const request = require('request')

const geocode = (address, callback) => {

    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicnViZW52aXJkdXp6byIsImEiOiJja3hqZ2R1eTkxNHM5MnBranJoenc1ZGt5In0.MiA9zrtWvXgM1Z3GVaoF1w&limit=1`

    request( {url, json: true}, (error, {body} = {}) => {
        
        if (error) {
            callback({error: 'Unable to connect with geolocation service!'}, undefined)
        } else if (body.features.length === 0) {
            callback({error: "Opss! An error has occurred: Please specify a valid location"},undefined)
        } else {
            callback(undefined, {
                latitud: body.features[0].geometry.coordinates[1],
                longitud: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode