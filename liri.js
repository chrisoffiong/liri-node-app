let Axios = require('Axios')
let dotenv = require('dotenv').config()
let moment = require('moment');
let fs = require('fs')
moment().format();
let omdbUrl = "http://www.omdbapi.com/?apikey=39b66563&t="
let Spotify = require('node-spotify-api');
let input = process.argv[2]
let value = process.argv[3]
if(input == "spotify-this-song") {
let spotify = new Spotify({
    id: 'wesilligan',
    secret:
})

spotify.search({
    type: 'track',
    query: value
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});
}