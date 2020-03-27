/* --------------- app.js --------------- */

"use strict";

console.clear();

{

    /* --------------- Require modules --------------- */

    const
        express = require("express"),
        path = require("path"),
        hbs = require("hbs"),
        geolocation = require("./utils/geolocation"),
        forecast = require("./utils/forecast");


    /* --------------- Create server --------------- */

    const app = express();


    /* --------------- Configure server --------------- */

    // Define paths for express configuration
    const
        publicDirectoryPath = path.join(__dirname, "../public"),
        viewsPath = path.join(__dirname, "../templates/views"),
        partialsPath = path.join(__dirname, "../templates/partials");

    // Setup static directory to serve
    app.use(express.static(publicDirectoryPath));

    // Setup handlebars engine and views location
    app.set("view engine", "hbs");
    app.set("views", viewsPath);
    hbs.registerPartials(partialsPath);


    /* --------------- Configure server responses --------------- */

    app.get("", function (request, response) {
        response.render("index", {
            title: "Index"
        });
    });

    app.get("/about", function (request, response) {
        response.render("about", {
            title: "About",
            content: "About this app"
        });
    });

    app.get("/help", function (request, response) {
        response.render("help", {
            title: "Help",
            content: "Helpful information"
        });
    });

    app.get("/weather", function (request, response) {
        if (!request.query.address) {
            return response.send({
                error: "You must provide an address"
            });
        }

        // Fetch location
        geolocation(request.query.address, function (error, { place_name, latitude, longitude } = {}) {
            if (error) return response.send({ error });

            // Fetch Weather
            forecast(latitude, longitude, function (error, forecast) {
                if (error) return response.send({ error });

                response.send({
                    location: place_name,
                    forecast
                });
            });
        });
    });

    // 404 - Pages not found

    app.get("/help/*", function (request, response) {
        response.render("404", {
            title: "Help article not found"
        });
    });

    app.get("*", function (request, response) {
        response.render("404", {
            title: "Page not found"
        });
    });

    /* --------------- Get server running --------------- */

    app.listen(3000, function () {
        console.log("Server is running on port 3000")
    });














}

console.log("Check");
