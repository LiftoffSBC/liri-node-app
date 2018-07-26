// As always, we grab the fs package to handle read/write
var fs = require("fs");
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');

// We then store the textfile filename given to us from the command line
function runCommand(command, searchTerm) {
  switch (command) {
    case 'my-tweets':
      showTweets();
      break;
    case 'spotify-this-song':
      showSong(searchTerm);
      break;
    case 'movie-this':
      showMovie(searchTerm)
      break;
    default:
      doRandom();
  }
}

function showTweets() {
  // Use twitter package and api credentials to get and display user's tweets.
  var client = new Twitter(keys.twitter);
  var params = { screen_name: 'ybbils' };
  client.get('statuses/user_timeline/count=20', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        console.log("-----------------------");
      }
    }
  });
};

function showSong(songName) {
  if (!songName) {
    songName = 'Ace of Base The Sign';
  }
  // Use spotify-api (check instructions for package name) package and
  // credentials to request and display a song based on a provided song name.
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify(keys.spotify)

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var track = data.tracks.items[0];

    console.log("Artist Name: " + track.artists[0].name);
    console.log("Album Name: " + track.album.name);
    console.log("Preview Link: " + track.preview_url);
    console.log("Song Name: " + track.name);
  })
  console.log("-----------------------");
  // console.log(songName);
}
function showMovie(movieName) {
  if (!movieName) {
    movieName = 'Mr. Nobody';
  }
  // Use request package moviedb api  (check instructions for names) and
  // credentials to request and display a movie based on a provided movie name.
  request('http://www.omdbapi.com/?t=' + movieName + '&apikey=d40948ff', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    var movieData = JSON.parse(body);
    var movie = {
      title: movieData.Title,
      year: movieData.Year,
      country: movieData.Country,
      language: movieData.Language,
      plot: movieData.Plot,
      actors: movieData.Actors,
      imdb: {
        source: movieData.Ratings[0].Source,
        rating: movieData.Ratings[0].Value
      },
      rottenTomatoes: {
        source: movieData.Ratings[1].Source,
        rating: movieData.Ratings[1].Value
      }
    }

    console.log("Title: " + movie.title);
    console.log("Release Year: " + movie.year);
    console.log("IMDB Rating: " + movie.imdb.rating);
    console.log("IMDB Rating: " + movie.rottenTomatoes.rating);
    console.log("Country: " + movie.country);
    console.log("Language: " + movie.language);
    console.log("Plot: " + movie.plot);
    console.log("Actors: " + movie.actors);

  });
}

function doRandom() {
  fs.readFile('./random.txt', 'UTF8', function (err, data) {
    if (err) throw err;

    var commands = data.split('/');
    var command = commands[Math.floor(Math.random() * (commands.length))];
    var dataCommands = command.split(',');


    runCommand(dataCommands[0], dataCommands[1]);
  });
}

runCommand(process.argv[2], process.argv[3]);
