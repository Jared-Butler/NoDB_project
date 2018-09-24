const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');



app = express();
app.use(bodyParser.json());

let weather = {}

app.get('/test', (req, res) => {res.status(200).send("10-4 Good Buddy!")})


app.post('/weather/:city/:country', (req,res) => {
    console.log(req.params)
    let {city, country} = req.params;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=20ca21f33e7467881b88613ccf4f7f0c`)
         .then( response => {
             let condition = response.data.weather[0].description;
             let temp = response.data.main.temp;
             let humidity = response.data.main.humidity;
             weather = {condition, temp, humidity}
             res.status(200).send(weather)
         }).catch(err => console.log(err))
});

app.post('/photo/:condition',(req,res) => {
    console.log(req.params)
    let {condition} = req.params;
    axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${condition}-weather&orientation=landscape&client_id=bba5128c4dbaa98c52e3bfc53e9bc8ec198d66ce775e18bd4fb5ca33bfe231ad`)
         .then(response => {
             
            res.status(200, 'Photo Updated')
         }).catch(err => console.log(err))
});


// console.log(currentWeather);

// app.get();

// app.put();

// app.delete();



app.listen(4005,() => console.log('High Five! We are live on Port 4005'));


