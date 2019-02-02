let axios = require('Axios')
let dotenv = require('dotenv').config()
let moment = require('moment');
let fs = require('fs')
moment().format();
let key = require("./key")
let spotifyR = require('node-spotify-api');
let inputArray = []
let input = process.argv[2]
let value = process.argv[3]


if (input == "spotify-this-song") {
    spotifyThis();
} else if (input == "concert-this") {
    concertThis();
} else if (input == "movie-this") {
    movieThis();
} else if (input == "do-what-it-says") {
    doSaysThis();
}

function doSaysThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        let splitData = data.split(",")
        console.log(splitData);
        input = splitData[0]
        value = splitData[1]

        if (input == "spotify-this-song") {
            spotifyThis();
        } else if (input == "concert-this") {
            concertThis();
        } else if (input == "movie-this") {
            movieThis();
        } else if (input == "do-what-it-says") {
            doSaysThis();
        }
    })
}

function spotifyThis() {
    let spotify = new spotifyR(key.spotify)
    spotify.search({
        type: 'track',
        query: value,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            let songInfo = data.tracks.items[0];
            let songResult = console.log(songInfo.artists[0].name)
            let nString = '------------------------\n' +
                "Song Name: " + songInfo.name + '\n' +
                "Album Name: " + songInfo.album.name + '\n' +
                "Artist Name: " + songInfo.artists[0].name + '\n' +
                "Url Link: " + songInfo.album.external_urls.spotify + '\n' + '------------------------\n'
            fs.appendFile('log.txt', 'LIRI Says:\n\n' + nString + '\n', (err) => {
                if (err) throw err;
                else {
                    console.log('The file has been saved!');
                    console.log(songInfo.artists[0].name)
                }
            })
        }

    })
}

function concertThis() {
    let concertUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"
    axios.get(concertUrl).then(
        function (response) {
            console.log("Venue: " + response.data[0].venue.name)
            console.log("Location: " + response.data[0].venue.city, response.data[0].venue.region)
            console.log("When: " + response.data[0].datetime)


            newString = '------------------------\n' +
                "Venue: " + response.data[0].venue.name + '\n' +
                "Location: " + response.data[0].venue.city, response.data[0].venue.region + '\n' +
                "When: " + response.data[0].datetime + '\n' + '------------------------\n'


            fs.appendFile('log.txt', 'LIRI Says:\n\n' + newString + '\n', (err) => {
                if (err) throw err;
                else {
                    console.log('The file has been saved!');

                }
            });
        }
    )
}

function movieThis() {
    if (value == "") {
        value = "Mr. Nobody"
    }
    let omdbUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + value + "&tomatoes=true&y=&plot=short&r=json"
    axios.get(omdbUrl).then(
        function (response) {
            // console.log(response.data)

            nonString = '------------------------\n' +
                "Title: " + response.data.Title + '\n' +
                "Actors: " + response.data.Actors + '\n' +
                "The movie's IMDB rating is: " + response.data.imdbRating + '\n' +
                "This movie's Rotten Tomatoe rating is: " + response.data.tomatoRating + '\n' +
                "This movie came out in: " + response.data.Year + '\n' +
                "Language: " + response.data.Language + '\n' +
                "Country: " + response.data.Country + '\n' +
                "Plot: " + response.data.Plot + '\n' + '------------------------\n'
            fs.appendFile('log.txt', 'LIRI Says:\n\n' + nonString + '\n', (err) => {
                if (err) throw err;
                else {
                    console.log('The file has been saved!');
                }
                console.log(response)

            })

        });
}