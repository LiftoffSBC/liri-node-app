// As always, we grab the fs package to handle read/write
var fs = require("fs");
var Twitter = require('twitter');

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
  var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });
   
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
}

function showSong(songName) {
  if(!songName){
    songName = 'Lose Yourself';
  }
  // Use spotify-api (check instructions for package name) package and
  // credentials to request and display a song based on a provided song name.
  console.log(songName);
}

function showMovie(movieName) {
  if(!movieName){
    movieName = '8 mile';
  }
  // Use request package moviedb api  (check instructions for names) and
  // credentials to request and display a movie based on a provided movie name.
  console.log(movieName);
}

function doRandom() {
  fs.readFile('./random.txt', 'UTF8',  function (err, data) {
    if (err) throw err;

    var commands = data.split('/');
    var command = commands[Math.floor(Math.random() * (commands.length))];
    var dataCommands = command.split(',');

    runCommand(dataCommands[0], dataCommands[1]);
  });
}

runCommand(process.argv[2], process.argv[3]);
