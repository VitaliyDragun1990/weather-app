const yargs = require('yargs');
const axios = require('axios');

// setup yargs to work with command line input from the user
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
            default: 'kiev'
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let apiKey = 'AIzaSyBe7Zrmmh3sAJiGAtZYuYcTwOTAQZkm-Fw';
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/40689e64cdeb380d4ae6dc0223cff891/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else  {
        console.log(error.message);
    }
});