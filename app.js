const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

/****************************************** CALLBACK VERSION ******************************************************/

/*************SETUP YARGS TO WORK WITH COMMAND LINE INPUT *********/

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

/***************** HANDLE USER INPUT AND DISPLAY WEATHER *************/

// Find given address and it's latitude and longitude
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);

        // if address found, get weather for it
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(error);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});




