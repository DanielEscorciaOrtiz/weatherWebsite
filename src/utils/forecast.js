/* --------------- Weather.js --------------- */
const request = require("request");

const weather = function (latitude, longitude, callback) {
    const url = `https://api.darksky.net/forecast/eb26c9d5a831fdb9e4d64fb312950e30/${latitude},${longitude}?units=si&lang=en`;

    request.get({ url, json: true }, function (error, { body: weather } = {}) {

        if (error) return callback("Unable to connect to weather service");

        if (weather.error) return callback("Unable to find location");
        
        console.log(weather.daily.data[0])
        callback(undefined, `${weather.daily.data[0].summary} Temperature of ${weather.currently.temperature} C, and a ${weather.currently.precipProbability}% of rain.
        We are expecting temperatures of maximum ${weather.daily.data[0].temperatureMax} C, and minimum of ${weather.daily.data[0].temperatureMin} C.`);
    });
}

module.exports = weather;