$(document).ready(function(){


function eventFinder(){
//seatgeek.com
//Your app secret is "46c31bd5bf11fe8eaa278a35e076ade5cdb8137dbf40eade638b75b55f7612f8" 
//- copy now as it can't be retrieved later.

var artist;
var artistID;
var zipCode;
//get user data input for artist name
artist = $("#user-input").val().trim();
//get user data input for zip code
var zipCode = $("#location-input").val().trim();
console.log(zipCode);
var APIKEY = "ODE3MjUzMnwxNTAwMjI5MjgxLjg5";
//url for API call to get artist upcoming events
var URL = "https://api.seatgeek.com/2/events?q=" + artist + "&client_id=" + APIKEY + "&format=json";
//url for API call to get artist ID
var performerURL = "https://api.seatgeek.com/2/performers?q=" + artist + "&client_id=" + APIKEY + "&format=json";
//array to hold address of upcoming shows
var concerts = [];
//website link array for ticket purchase
var link = [];
//store time and date in an array
var showDate = [];
//convert time and date using moment.js
var convertedDate = [];

$.ajax({
url: URL,
method: "GET"}).done(function(response){
console.log (response);
//store upcoming tour locations and display to user
for (var i = 0; i < 10; i++){
	// if (artist.indexOf(0) === response.events[i].title.indexOf(0)){
			concerts[i] = response.events[i].venue.extended_address;
			link[i] = response.events[i].venue.url;
			showDate[i]=response.events[i].datetime_local;
			convertedDate[i] =moment(showDate[i]).format('  dddd MMM Do, YYYY hh:mm a');
			console.log("converted: " + convertedDate[i]);
			$("#tour-location").append($("<a href=" + link[i] + ">" + concerts[i]+ "</a>  "));
			$("#tour-location").append(convertedDate[i] + "<br>");
			}
		//}
	});

	$.ajax({
url: performerURL,
method: "GET"}).done(function(response){
console.log (response);
artistID = response.performers[0].id;
console.log(artistID);


var localURL = "https://api.seatgeek.com/2/recommendations?performers.id=" + artistID + "&postal_code=" + zipCode + "&client_id=ODE3MjUzMnwxNTAwMjI5MjgxLjg5";

$.ajax({
url: localURL,
method: "GET"}).done(function(response){
console.log ("recommendations: " + response);
});
});

//Khalid's ajax call to get events based on city and state (currently returns venues in your area)
    $("#add-city").on("click", function(event) {
        event.preventDefault();
    var city     = $("#city-input").val().trim();
    var state    = $("#state-input").val().trim();
    var queryURL = "https://api.seatgeek.com/2/venues?city=" + city +  "&state="+ state +"&client_id=" +  "ODE3MjUzMnwxNTAwMjI5MjgxLjg5" + "&format=json"


    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(response.Runtime);
    });


     
        });

}



function artistResult(){
	//store user search parameter
	var artist;
	artist = $("#user-input").val().trim();
	var artistURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=5261f823d2a8853b4a32607ae232d586&format=json";

$.ajax({
	url: artistURL,
	method: "GET"}).done(function(response){
		//store the artists weblink on last.fm 
		var link = response.artist.url;
		//save the link as an ahref element 
		var newDiv = $("<a href=" + link + ">");
		var bio = response.artist.bio.summary;
		var newDiv2 = $("<p class = bio>" + bio);
		 console.log(response);
		 //save artist image
		 var img = response.artist.image[3]["#text"];
		 console.log(img);
		//save image to an html img element
		var newImage = $("<img>").attr("src", img);
		console.log(newImage);
		$("#artist-bio").prepend(newDiv2);
		$("#artist-bio").prepend(newImage);
	
	});
}
function topArtists(){
	
	var topURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5261f823d2a8853b4a32607ae232d586&format=json";

$.ajax({
	url: topURL,
	method: "GET"}).done(function(response){

		var top = [];
		var topPic = [];
		console.log(response);

		for (var i = 0; i < 10; i++){
			top[i] = response.artists.artist[i].name;
			topPic[i] = response.artists.artist[i].image[3]["#text"];
			var artImg= $("<img>").attr("src", topPic[i]);
			$("#top-ten").append(artImg);
			$("#top-ten").append(top[i]);
		}

		
	});
	console.log("peace");
}
function findSimilar(){

	//store user search parameter
	var artist;
	artist = $("#user-input").val().trim();
	var similarURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=5261f823d2a8853b4a32607ae232d586&format=json";


	$.ajax({
	url: similarURL,
	method: "GET"}).done(function(response){
	console.log(response);
		var topTen = [];
		var topTenPic = [];
		var simImg;

		for (var i = 0; i < 10; i++){
			topTen[i] = response.similarartists.artist[i].name;
			topTenPic[i] = response.similarartists.artist[i].image[3]["#text"];
			simImg = $("<img>").attr("src", topTenPic[i]);
			$("#similar").prepend(topTen[i]);
			$("#similar").prepend(simImg);

			}
		});
}

//when user clicks button for artist name
$("#get-results").on("click",function(event){
	event.preventDefault();
	artistResult();
	eventFinder();
});
//when user clicks button for artists similar to name the put
$("#similar-artists").on("click",function(event){
	event.preventDefault();
	findSimilar();
});
//when user adds their location
$("#add-location").on("click",function(event){
	event.preventDefault();
	
});
//when user clicks button for top artists
$("#top-artists").on("click",function(event){
	event.preventDefault();
	console.log("yo");
	topArtists();
});

});
