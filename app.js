const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {

    // get your own apiKey for free from https://openweathermap.org/api (you need to create an account)
    const apiKey = 'your apiKey';
    // NOTE: You need to set your apiKey first to get it work

    const cityName = req.body.cityName;
    const unit = 'units=metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&' + unit + '&appid=' + apiKey;

    // getting data from openweathermap and put it into const so we can use them to write on the web page
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'

            // sending headings and img to the web page for showing it
            res.write('<h1>The temperature in ' + cityName + ' is ' + temp + 'C.</h1>');
            res.write('<h2>The Weather is currently ' + description + '</h2>');
            res.write('<img src=' + iconURL + '>');
            res.end();
        })
    })
})

app.listen(port, () => {
    console.log(`this app is listining at http://localhost:${port}`);
});