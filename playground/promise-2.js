const request = require('request');

const geocodeAddress = (address) => {
    let encodedAddress = encodeURIComponent(address);
    let apiKey = 'AIzaSyBe7Zrmmh3sAJiGAtZYuYcTwOTAQZkm-Fw';
    // return Promise with result of the request
    return new Promise((resolve, reject) => {
        // make http request
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodedAddress}`,
            json: true  // return body will be parsed by JSON
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});