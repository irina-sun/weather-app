const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '45c1a259c5b14b477a430d8dfa1b4d80';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=45c1a259c5b14b477a430d8dfa1b4d80`

    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        }else {
            let weather = JSON.parse(body)
            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            }else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
    //res.render('index');
    //console.log(req.body.city);
})
app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})