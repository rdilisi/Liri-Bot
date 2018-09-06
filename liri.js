require("dotenv").config();
var fs = require("fs")
var keys = require("./keys")
var request = require ("request")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var programtorun = process.argv[2]
var action = process.argv[3]

if (programtorun === "my-tweets"){
    myTweets()
}

else if (programtorun === "spotify-this-song"){
    spotifyThisSong(action)
}

else if (programtorun === "movie-this"){
    movieThis(action)
}

else if (programtorun === "do-what-it-says"){
    doWhatItSays()
}

else {
    console.log ("checkyourself")
}

function myTweets(){
    console.log ("running twitter program")
}

function spotifyThisSong(song){
    if (song){
        var query = song
    }
    else{
        var query = "Can't touch this"
    }
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0].artists[0].name); 
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].external_urls.spotify);
      console.log(data.tracks.items[0].album.name);
      });
}

function movieThis(searchterm) {
    request("http://www.omdbapi.com/?t=" + searchterm + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (error && response.statusCode === 200) {
            console.log(error)

            // return console.log(error)
        } else if (!error) {
            // console.log(JSON.parse(body))
            console.log("Movie Title is: " + JSON.parse(body).Title)
            console.log("Movie Release Year is: " + JSON.parse(body).Released)
            console.log("Movie Rotten Tomatos Rating is: " + JSON.parse(body).Ratings[0].Value)
            console.log("Movie IMDB rating is: " + JSON.parse(body).imdbRating)
            console.log("Movie was produced in: " + JSON.parse(body).Country)
            console.log("Movie Language is: " + JSON.parse(body).Language)
            console.log("Movie Plot is: " + JSON.parse(body).Plot)
            console.log("Movie Actors are: " + JSON.parse(body).Actors)
            
        }
    })
}

function doWhatItSays(searchterm, queryterm) {
    fs.readFile("random.txt","utf8", function(error,result){
        
        var array = result.split(",")
        console.log (array)
        var program = array[0]
        var action = array[1]
        if (program ==="spotify-this-song"){
            spotifyThisSong(action)
        }
    })
    // if (queryterm === "movie-this") {
    //     moviethis(searchterm)

    // } else if (queryterm === "spotify-this-song") {
    //     spotifythis(searchterm)
    // } else if (queryterm === "concert-this") {
    //     concertthis(searchterm)
    // } else {
    //     console.log("Not Working")
    // }
}

// function logging() {
//     fs.appendFile("Log.txt", ", " + queryterm, function (err) {
//         if (err) {
//             console.log("somethings wrong")
//         } else {
//             console.log("node cmd logged")
//         }
//     })
// }
// logging()





