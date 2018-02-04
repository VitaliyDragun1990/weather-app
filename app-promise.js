const yargs = require('yargs');
const axios = require('axios');

/****************************************** PROMISE VERSION ******************************************************/

/*************SETUP YARGS TO WORK WITH COMMAND LINE INPUT ************/

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

/*********** PREPARE NEEDED DATA ***********************/

let encodedAddress = encodeURIComponent(argv.address);
let apiKey = 'AIzaSyBe7Zrmmh3sAJiGAtZYuYcTwOTAQZkm-Fw';
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodedAddress}`;

/************ MAKE CALL USING AXIOS *******************/

axios.get(geocodeUrl).then((response) => {

    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    // successfully fetch address data
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    // create url to fetch weather for given address
    let weatherUrl = `https://api.darksky.net/forecast/40689e64cdeb380d4ae6dc0223cff891/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    // make call to fetch weather
    return axios.get(weatherUrl);
}).then((response) => {
    // successfully fetch weather for given address
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);

}).catch((error) => {
    // something went wrong
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else  {
        console.log(error.message);
    }
});