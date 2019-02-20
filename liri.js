/*
*	Load Required Node Modules
ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
*/
// fs is a core Node package for reading and writing files
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify= new Spotify(keys.spotify);
var fs = require("fs");
// Grab the axios package...
var axios = require("axios");
// console.log(spotify)

//New way to do Command line interactions
var term= process.argv[2];
// console.log(term);
var title= process.argv.slice(3).join(" ");
// console.log(title);

var start = function() {
	if(term === "concert-this") {
			show();
	}else if(term === "movie-this") {
			movie();
	}else if(term === "spotify-this-song") {
			music();
	}
	
};

var music = function() {
	var song = title;
	spotify.search({ type: "track",query: song}, function(err, data) {
    if(err) {
        return console.log("Error occured " + err);
    }
    var songData =[
        "Artist Name: " + data.tracks.items[0].artists[0].name,
        "Song Name: " + data.tracks.items[0].name,
        "Preview URL: " + data.tracks.items[0].preview_url,
        "Album: " + data.tracks.items[0].album.name
    ].join("\n\n");
    
    fs.appendFile("log.txt",song + songData, function(err) {
        if(err) throw(err);
        console.log(songData);
    });

    });
};


var show = function() {
	var artist = title;
	// console.log(artist);
	var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
	// console.log(URL);
	axios.get(URL).then(function(response) {
			var jsonData = response.data;
			var artistData = [
					"Venue: " + jsonData[0].venue.name,
					"Location: " + jsonData[0].venue.city,
					"Date: " + jsonData[0].datetime
			].join("\n\n");

			fs.appendFile("log.txt",artist + artistData, function(err) {
					if(err) throw(err);
					console.log(artistData);
			});
	});
};
//99999999999999999999999999999 NEW WAY OF DOING MOVIES	999999999999999999999999999999999

var movie = function() {
	var film = title;
	// console.log(film);
	var URL = "http://www.omdbapi.com/?t=" + film + "&y=&plot=short&apikey=trilogy";
	// console.log(URL);
	axios.get(URL).then(function(response) {
					var jsonData = response.data;
					//console.log(jsonData);
					 var movieData = [
					"Title: " + jsonData.Title,
					"Year: " + jsonData.Year, 
					"IMDB Ratings: " + jsonData.Ratings[0].Value,
					"Rotten Tomatos Ratings: " + jsonData.Ratings[1].Value,
					"Country: " + jsonData.Country,
					"Language: " + jsonData.Language,
					"Plot: " + jsonData.Plot,
					"Actors: " + jsonData.Actors
					].join("\n\n");

					fs.appendFile("log.txt",film + movieData, function(err) {
							if(err) throw(err);
							console.log(movieData);
					});      
			});
};

var music = function() {
	var song = title;
//    console.log(song);

	 spotify.search({ type: "track",query: song}, function(err, data) {
	 if(err) {
			 return console.log("Error occured " + err);
	 }
	 var songData =[
			 "Artist Name: " + data.tracks.items[0].artists[0].name,
			 "Song Name: " + data.tracks.items[0].name,
			 "Preview URL: " + data.tracks.items[0].preview_url,
			 "Album: " + data.tracks.items[0].album.name
	 ].join("\n\n");
	 
	 fs.appendFile("log.txt",song + songData, function(err) {
			 if(err) throw(err);
			 console.log(songData);
	 });

	 });
};

// doAsYerTold will read in a file to determine the desired command and then execute
function doAsYerTold() {
	// Append the command to the log file
	fs.appendFile('./log.txt', 'User Command: node liri.js do-what-it-says\n\n', (err) => {
		if (err) throw err;
	});

	// Read in the file containing the command
	fs.readFile('./random.txt', 'utf8', function (error, data) {
		if (error) {
			console.log('ERROR: Reading random.txt -- ' + error);
			return;
		} else {
			// Split out the command name and the parameter name
			var cmdString = data.split(',');
			var command = cmdString[0].trim();
			var param = cmdString[1].trim();

			switch(command) {
				case 'my-bands':
					retrieveBands(); 
					break;

				case 'spotify-this-song':
					spotifySong(param);
					break;

				case 'movie-this':
					retrieveOBDBInfo(param);
					break;
			}
		}
	});
}
start();

// Determine which LIRI command is being requested by the user
// if (liriCommand === 'my-bands') {
// 	retrieveBands(); 

// } else if (liriCommand === `spotify-this-song`) {
// 	spotifySong(liriArg);

// } else if (liriCommand === `movie-this`) {
// 	retrieveOBDBInfo(liriArg);

// } else if (liriCommand ===  `do-what-it-says`) {
// 	doAsYerTold();

// } else {
	// Append the command to the log file
	// fs.appendFile('./log.txt', 'User Command: ' + cmdArgs + '\n\n', (err) => {
	// 	if (err) throw err;


//	Read in command line arguments
//oooooooooooooooooooooo	OLD WAY 	ooooooooooooooooooooooooooooooooooooo
// Read in the command line arguments. This is gonna be so cool!
// var cmdArgs = process.argv;
// The LIRI command will always be the second command line argument
// var liriCommand = cmdArgs[2];
// The parameter to the LIRI command may contain spaces
// var liriArg = '';
// for (var i = 3; i < cmdArgs.length; i++) {
// 	liriArg += cmdArgs[i] + ' ';
// }
//ok that wasn't that cool....
////oooooooooooooooooooooo	NEW WAY 	ooooooooooooooooooooooooooooooooooooo




//Captain's Log. I have discovered a new debugging method:
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
// console.log();
//I call it "The Subtle Approach"




//iiiiiiiiiiiiiii 	THIS WASN'T WORKING FOR ME 	iiiiiiiiiiiiiiiiiiiiiiiiiiiii
// This block of code will read from the "movies.txt" file.
// function retrieveOBDBInfo(movie) {
	// Append the command to the log file
	// fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + movie + '\n\n', (err) => {
	// 	if (err) throw err;
	// });

	// If no movie is provided, LIRI defaults to 'Mr. 3000'
	// var search;
	// if (movie === '') {
	// 	search = 'Mr. 3000';
	// } else {
	// 	search = movie;
	// }

	// Replace spaces with '+' for the query string
	// search = search.split(' ').join('+');

	// Construct the query string
	// var queryStr = 'http://www.omdbapi.com/?t=' + search + '&plot=full&tomatoes=true';

	// Send the request to OMDB
	// request(queryStr, function (error, response, body) {
	// 	if ( error || (response.statusCode !== 200) ) {
	// 		var errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

	// 		// Append the error string to the log file
	// 		fs.appendFile('./log.txt', errorStr1, (err) => {
	// 			if (err) throw err;
	// 			console.log(errorStr1);
	// 		});
	// 		return;
	// 	} else {
	// 		var data = JSON.parse(body);
	// 		if (!data.Title && !data.Released && !data.imdbRating) {
	// 			var errorStr2 = 'ERROR: No movie info retrieved, please check the spelling of the movie name!';

	// 			// Append the error string to the log file
	// 			fs.appendFile('./log.txt', errorStr2, (err) => {
	// 				if (err) throw err;
	// 				console.log(errorStr2);
	// 			});
	// 			return;
	// 		} else {
	// 	    	// Pretty print the movie information
	// 	    	var outputStr = '------------------------\n' + 
	// 							'Movie Information:\n' + 
	// 							'------------------------\n\n' +
	// 							'Movie Title: ' + data.Title + '\n' + 
	// 							'Year Released: ' + data.Released + '\n' +
	// 							'IMBD Rating: ' + data.imdbRating + '\n' +
	// 							'Country Produced: ' + data.Country + '\n' +
	// 							'Language: ' + data.Language + '\n' +
	// 							'Plot: ' + data.Plot + '\n' +
	// 							'Actors: ' + data.Actors + '\n' + 
	// 							'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
	// 							'Rotten Tomatoes URL: ' + data.tomatoURL + '\n';

				// Append the output to the log file
	// 			fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
	// 				if (err) throw err;
	// 				console.log(outputStr);
	// 			});
	// 		}
	// 	}
	// });
// }


// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
// fs.readFile("best_things_ever.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  // if (error) {
  //   return console.log(error);
  // }

  // We will then print the contents of data
  // console.log(data);

  // Then split it by commas (to make it more readable)
  // var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  // console.log(dataArr);

//oooooooooooooooo	return error	oooooooooooooooooooooo


//777777777777777777777				old way of retreiving bands:			77777777777777777777777777777
// retrieveBands will retrieve my last 20 tweets and display them together with the date. This is gonna be so cool!
// function retrieveBands() {
	// Append the command to the log file
	// fs.appendFile('./log.txt', 'User Command: node liri.js my-bands\n\n', (err) => {
	// 	if (err) throw err;
	// });


	// var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
	// axios.get(URL).then(function(response) {
	// 	var jsonData = response.data;
	// 	var artistData = [
	// 			"Venue: " + jsonData[0].venue.name,
	// 			"Location: " + jsonData[0].venue.city,
	// 			"Date: " + jsonData[0].datetime
	// 	].join("\n\n");

	// 	fs.appendFile("log.txt",artist + artistData, function(err) {
	// 			if(err) throw(err);
	// 			console.log(artistData);
// spotifySong will retrieve information on a song from Spotify. This is gonna be so cool!

// function spotifySong(song) {
	// Append the command to the log file
	// fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song ' + song + '\n\n', (err) => {
	// 	if (err) throw err;
	// });

	// If no song is provided, LIRI defaults to 'Aces High' by Iron Maiden
	// var search;
	// if (song === '') {
	// 	search = 'Aces High Iron Maiden';
	// } else {
	// 	search = song;
	// }

	// spotify.search({ type: 'track', query: search}, function(error, data) {
	//     if (error) {
	// 		var errorStr1 = 'ERROR: Retrieving Spotify track -- ' + error;

			// Append the error string to the log file. This is gonna be so cool!
			// fs.appendFile('./log.txt', errorStr1, (err) => {
			// 	if (err) throw err;
			// 	console.log(errorStr1);
			// });
			// return;
	    // } else {
			// var songInfo = acedata.tracks.items[0];
			// if (!songInfo) {
			// 	var errorStr2 = 'ERROR: No song info retrieved, please check the spelling of the song name!';

				// Append the error string to the log file
// 				fs.appendFile('./log.txt', errorStr2, (err) => {
// 					if (err) throw err;
// 					console.log(errorStr2);
// 				});
// 				return;
// 			} else {
// 				// Pretty print the song information. This is gonna be so cool!
// 				var outputStr = '------------------------\n' + 
// 								'Song Information:\n' + 
// 								'------------------------\n\n' + 
// 								'Song Name: ' + songInfo.name + '\n'+ 
// 								'Artist: ' + songInfo.artists[0].name + '\n' + 
// 								'Album: ' + songInfo.album.name + '\n' + 
// 								'Preview Here: ' + songInfo.preview_url + '\n';

// 				// Append the output to the log file
// 				fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
// 					if (err) throw err;
// 					console.log(outputStr);
// 				});
// 			}
// 	    }
// 	});
// };

	// Initialize the Band client
	// var client = new Band(BandKeys);

	// // Set the 'screen_name' to my Twitter handle
	// var params = {screen_name: '_angrbrd', count: 20};

	// // Retrieve the last 20 tweets
	// client.get('statuses/user_timeline', params, function(error, tweets, response) {
	// 	if (error) {
	// 		var errorStr = 'ERROR: Retrieving bands -- ' + error;

	// 		// Append the error string to the log file
	// 		fs.appendFile('./log.txt', errorStr, (err) => {
	// 			if (err) throw err;
	// 			console.log(errorStr);
	// 		});
	// 		return;
	// 	} else {
	// 		// Pretty print user tweets. This is gonna be so cool!
	// 		var outputStr = '------------------------\n' +
	// 						'User Bands:\n' + 
	// 						'------------------------\n\n';

	// 		for (var i = 0; i < tweets.length; i++) {
	// 			outputStr += 'Created on: ' + tweets[i].created_at + '\n' + 
	// 						 'Tweet content: ' + tweets[i].text + '\n' +
	// 						 '------------------------\n';
	// 		}

	// 		// Append the output to the log file
	// 		fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
	// 			if (err) throw err;
	// 			console.log(outputStr);
	// 		});
	// 	}
	// });

// retrieveOMDBInfo will retrieve information on a movie from the OMDB database. This is gonna be so cool!

		// If the user types in a command that LIRI does not recognize, output the Usage menu 
		// which lists the available commands.
		// outputStr = 'Usage:\n' + 
		// 		   '    node liri.js my-bands\n' + 
		// 		   '    node liri.js spotify-this-song "<song_name>"\n' + 
		// 		   '    node liri.js movie-this "<movie_name>"\n' + 
		// 		   '    node liri.js do-what-it-says\n';

		// Append the output to the log file
// 		fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
// 			if (err) throw err;
// 			console.log(outputStr);
// 		});
// 	});
// }

// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
// axios
//   .get("http://www.artists.bandsintown.com/bandsintown-api")
//   .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
  //   console.log(response.data);
  // })
  // .catch(function(error) {
  //   if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //   console.log(error.request);
    // } else {
      // Something happened in setting up the request that triggered an Error
  //     console.log("Error", error.message);
  //   }
  //   console.log(error.config);
  // 