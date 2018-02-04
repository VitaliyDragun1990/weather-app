const request = require('request');

/***************** DEFINE FUNCTION RETURNING ADDRESS WITH LAT & LONG ****************/

const geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    let apiKey = 'AIzaSyBe7Zrmmh3sAJiGAtZYuYcTwOTAQZkm-Fw';

    // make http request
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodedAddress}`,
        json: true  // return body will be parsed by JSON
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
};