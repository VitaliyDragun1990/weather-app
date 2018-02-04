const request = require('request');

/****************************** RETURN WEATHER INFO USING GIVEN LAT & LONG **********************/

const getWeather = (lat, lng, callback) => {
    request({
            url: `https://api.darksky.net/forecast/40689e64cdeb380d4ae6dc0223cff891/${lat},${lng}`,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback('Unable to fetch weather.');
            }
        });
};

module.exports.getWeather = getWeather;