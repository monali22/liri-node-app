require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");


var spotify = new Spotify(keys.spotify);

var choice = process.argv.splice("2");
var name = [];
name.push(choice[1]);
name.push(choice[2]);
name = name.join(" ");
console.log(name);
choice = choice[0];



switch (choice) {
    case "spotify": findSpotify(name);
        break;

    case "event": event(name);
        break;

    case "movie": movie(name);
        break;

}


function findSpotify(name) {

    spotify
        .search({ type: 'track', query: name })
        .then(function (response) {
            //console.log(response.tracks.items[0]);
            console.log("Artist(s) are "+response.tracks.items[0].artists[0].name);
            console.log("The song's name is "+response.tracks.items[0].name);
            console.log("A preview link of the song from Spotify is "+response.tracks.items[0].external_urls.spotify);
            console.log("The album that the song is from is "+response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });

}

function event() {

    var query = "https://rest.bandsintown.com/artists/" + choice + "/events?app_id=codingbootcamp";

    axios.get(query).then(function (response) {
        //console.log(response.data);
        console.log("Name of the venue is " + response.data[0].venue.name);
        console.log("Venue location is " + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log("Date of the Event is " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    })

}

function movie(name) {

    var query = "http://www.omdbapi.com/?t="+name+"&y=&plot=short&apikey=trilogy";
    axios.get(query).then(function (response) {
       // console.log(response.data);
        console.log("Title of the movie is "+response.data.Title);
        console.log("Year the movie came out "+response.data.Year);
        console.log("IMDB Rating of the movie is "+response.data.imdbRating);
        console.log("Rotten Tomatoes Rating of the movie is"+response.data.Ratings[1].Value);
        console.log("Country where the movie was produced "+response.data.Country);
        console.log("Language of the movie "+response.data.Language);
        console.log("Plot of the movie "+response.data.Plot);
        console.log("Actors in the movie "+response.data.Actors);
        
    })
}