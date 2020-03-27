/* --------------- Geolocation.js --------------- */
const request = require("request");

const geolocation = function (address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${decodeURI(address)}.json?access_token=pk.eyJ1IjoiZGVzY29yY2lhIiwiYSI6ImNrODd5a2tlcDAwZ2gzZnBpZGZxaHAyZDAifQ.yHbIEBb0X-rSmUH2FOYkOw&limit=1`;

    request.get({ url, json: true }, function (error, { body: { features: [location] = [] } = {} } = {}) {

        if (error) return callback("Unable to connect to location service");

        if (!location) return callback("Unable to find location");

        callback(undefined, {
            place_name: location.place_name,
            latitude: location.center[1],
            longitude: location.center[0]
        })
    });
}

module.exports = geolocation;