const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVuZzAwMCIsImEiOiJjazk5ZXhvOXIwdXF0M2VxeGUyNGlsdGRjIn0.qp3e41btV2SyOM5k_9VN-w&limit=1'

    request( {url, json:true }, (error, {body}) =>{
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location.try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
