const request = require('request')


const forcast = (latitud, longitud, callback) => {
    

    url = `http://api.weatherstack.com/current?access_key=5279e61d356a8d5fda3d7231cd13100b&query=${encodeURIComponent(latitud)},${encodeURIComponent(longitud)}&` 

    request( {url, json: true}, (error, {body} = {}) => {
       
        if (error) {
            callback( { error: "Opss! An error has occurred: can't connect to weather app!" }, undefined)
        } else if (body.error) {
            callback( { error: `Opss! An error has occurred: ${body.error.info}` }, undefined)
        } else {
            
            callback(undefined, {
                icon: body.current.weather_icons[0],
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        
        }
    })
}

module.exports = forcast
