/* --------------- app.js --------------- */

"use strict";

const
    forecast0 = document.getElementById("forecast0"),
    forecast1 = document.getElementById("forecast1"),
    form = document.getElementById("form"),
    searchBox = form.querySelector("#searchBox"),
    form2 = document.getElementById("form2"),
    searchBox2 = form2.querySelector("#searchBox");

/* --------------- Using fetch --------------- */

form.addEventListener("submit", function () {
    event.preventDefault();
    loading();
    let place = searchBox.value;
    let urlWeather = `/weather?address=${place}`;

    fetch(urlWeather).then(function (response) {
        response.json().then(function (data) {
            if (data.error) return display(data.error);
            display(undefined, data);
        });
    });
});


/* --------------- Using XMLHttpRequest --------------- */

form2.addEventListener("submit", function () {
    event.preventDefault();
    loading();
    let place = searchBox2.value;
    let urlWeather = `/weather?address=${place}`;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function (response) {
        let data = JSON.parse(response.srcElement.response);
        if (data.error) return display(data.error);
        display(undefined, data);
    });

    xhr.open("GET", urlWeather);
    xhr.send();
});


/* --------------- Show in HTML --------------- */

let loading = function () {
    forecast0.textContent = "Loading weather...";
    forecast1.textContent = "";
};
let display = function (error, data) {
    if (error) {
        forecast0.textContent = error;
        forecast1.textContent = "";
        return;
    }
    forecast0.textContent = data.location;
    forecast1.textContent = data.forecast;
};
