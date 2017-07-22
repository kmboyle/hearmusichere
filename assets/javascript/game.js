
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhkI41zjg76ogdJS04uLRMxi4HdmU8WeU",
    authDomain: "hearmusichere-70e5c.firebaseapp.com",
    databaseURL: "https://hearmusichere-70e5c.firebaseio.com",
    projectId: "hearmusichere-70e5c",
    storageBucket: "",
    messagingSenderId: "579170769386"
  };
  firebase.initializeApp(config);

  //creat a database reference
  var databsae = firebase.database();

  //map needs to load before jquery document.ready
var map;

function initMap() {

<<<<<<< HEAD
$(document).ready(function(){

//This is the important function!!! We can change the id's as necessary 
console.log( "ready!" );


$(document).on('click' , "#get-results" , function(event){
 
        event.preventDefault();
       
      //generating the youtube video based on user search  
	 var baseUrl = 'http://www.youtube.com/embed?listType=search&list=';
	 var searchField = $("#user-input").val();
	 var targetUrl = baseUrl + searchField;
	 
	 $("#yourIframe").attr("src", targetUrl);

	 //this is generating the lyric link for user search
	var baseUrl = 'http://search.azlyrics.com/search.php?q=';
	 var searchField = $("#user-input").val();
	 var targetUrl = baseUrl + searchField;
	 
	 $("#lLink").attr("href", targetUrl);
 	
 	
});


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
//var zipCode = parseInt($("#user-area").val().trim());
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
//name of similar artist plying locally
var localArtist= [];
//array to hold lon and lat of location to put on map
var lon = [];
var lat = [];

$.ajax({
url: URL,
method: "GET"}).done(function(response){
console.log (response);
//store Artists upcoming tour locations and display to user
for (var i = 0; i < 10; i++){
 concerts[i] = response.events[i].venue.extended_address;
 link[i] = response.events[i].venue.url;
 showDate[i]=response.events[i].datetime_local;
 convertedDate[i] =moment(showDate[i]).format('  dddd MMM Do, YYYY hh:mm a');
 console.log("converted: " + convertedDate[i]);
 $("#tour-location").append($("<a href=" + link[i] + ">" + concerts[i]+ "</a>  "));
 $("#tour-location").append(convertedDate[i] + "<br>");
 }
});

$.ajax({
url: performerURL,
method: "GET"}).done(function(response){
console.log (response);
artistID = parseInt(response.performers[0].id);
console.log(artistID);
//API call for FIND SIMILAR ARTISTS IN YOUR AREA SHOWS
var localURL = "https://api.seatgeek.com/2/recommendations?performers.id=" + artistID + "&geoip=true&client_id=ODE3MjUzMnwxNTAwMjI5MjgxLjg5";

$.ajax({
url: localURL,
method: "GET"}).done(function(response){
console.log (response);
for (var i = 0; i < 10; i++){
 //get upcoming shows based on similar artists playing locally
 concerts[i] = response.recommendations[i].event.venue.name;
 link[i] = response.recommendations[i].event.url;
 showDate[i]=response.recommendations[i].event.datetime_local;
 localArtist [i] = response.recommendations[i].event.title;			
 convertedDate[i] =moment(showDate[i]).format('  dddd MMM Do, YYYY hh:mm a');
 console.log("converted: " + convertedDate[i]);
 $("#near-you").append($("<h2>" + localArtist[i] + "  </h2><a href=" + link[i] + ">" + concerts[i]+ "</a>  "));
 $("#near-you").append(convertedDate[i] + "<br>");
 //get venue's coordinates
 lon[i] = response.recommendations[i].event.venue.location.lon;
 lat[i] = response.recommendations[i].event.venue.location.lat;			
=======
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: new google.maps.LatLng(35.22, -80.84),
        mapTypeId: 'terrain'
    });
>>>>>>> kevinB
}

$(document).ready(function() {

    function eventFinder() {
        //seatgeek.com
        //Your app secret is "46c31bd5bf11fe8eaa278a35e076ade5cdb8137dbf40eade638b75b55f7612f8" 
        //- copy now as it can't be retrieved later.

        var artist;
        var artistID;
        var zipCode;
        //get user data input for artist name
        artist = $("#user-input").val().trim();
        //get user data input for zip code
        //var zipCode = parseInt($("#user-area").val().trim());
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
        //name of similar artist plying locally
        var localArtist = [];
        //array to hold lon and lat of location to put on map
        var lon = [];
        var lat = [];
        var iconBase = 'assets/css/smallNote.png';

        $.ajax({
            url: URL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            //store Artists upcoming tour locations and display to user
            for (var i = 0; i < 10; i++) {
                concerts[i] = response.events[i].venue.extended_address;
                link[i] = response.events[i].venue.url;
                showDate[i] = response.events[i].datetime_local;
                convertedDate[i] = moment(showDate[i]).format('  dddd MMM Do, YYYY hh:mm a');
                console.log("converted: " + convertedDate[i]);
                $("#tour-location").append($("<a target='_blank' href=" + link[i] + ">" + concerts[i] + "</a>  "));
                $("#tour-location").append(convertedDate[i] + "<br>");
            }
        });

        $.ajax({
            url: performerURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            artistID = parseInt(response.performers[0].id);
            console.log(artistID);
            //API call for FIND SIMILAR ARTISTS IN YOUR AREA SHOWS
            var localURL = "https://api.seatgeek.com/2/recommendations?performers.id=" + artistID + "&geoip=true&client_id=ODE3MjUzMnwxNTAwMjI5MjgxLjg5";

            $.ajax({
                url: localURL,
                method: "GET"
            }).done(function(response) {
                for (var i = 0; i < 10; i++) {
                    //get upcoming shows based on similar artists playing locally
                    concerts[i] = response.recommendations[i].event.venue.name;
                    link[i] = response.recommendations[i].event.url;
                    showDate[i] = response.recommendations[i].event.datetime_local;
                    localArtist[i] = response.recommendations[i].event.title;
                    convertedDate[i] = moment(showDate[i]).format('  dddd MMM Do, YYYY hh:mm a');
                    $("#near-you").append($("<h2>" + localArtist[i] + "  </h2><a target='_blank' href=" + link[i] + ">" + concerts[i] + "</a>  "));
                    $("#near-you").append(convertedDate[i] + "<br>");
                    //get venue's coordinates and create markers to put on the map
                    lon[i] = response.recommendations[i].event.venue.location.lon;
                    lat[i] = response.recommendations[i].event.venue.location.lat;
                    var coords = { lat: lat[i], lon: lon[i] }
                    var latLng = new google.maps.LatLng(coords.lat, coords.lon);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: iconBase
                    });
                }
            });
        });
    }

    function artistResult() {
        //store user search parameter
        var artist;
        artist = $("#user-input").val().trim();
        var artistURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=5261f823d2a8853b4a32607ae232d586&format=json";

        $.ajax({
            url: artistURL,
            method: "GET"
        }).done(function(response) {
            //store the artists weblink on last.fm 
            var link = response.artist.url;
            //save the link as an ahref element 
            var newDiv = $("<a target='_blank' href=" + link + ">");
            var bio = response.artist.bio.summary;
            var newDiv2 = $("<p class = bio>" + bio);
            console.log(response);
            //save artist image
            var img = response.artist.image[3]["#text"];
            //save image to an html img element

            var artistPic = $("<img>");

            artistPic.attr("src", img);
            artistPic.attr("height", 200);
            artistPic.attr("width", 300);
            artistPic.attr("alt", "");

            var i = 0;

            $('.item').first().removeClass('active');
            $('.carousel-indicators > li').first().removeClass('active');


            $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators');

            $(".carousel-inner").prepend($('<div class="item"><div class="container">' +
                '<div class="carousel-caption"><a href="" target="_blank">' +
                artistPic.prop('outerHTML') + '</a></div></div></div>'));

            i++;


            $('.item').first().addClass('active');
            $('.carousel-indicators > li').first().addClass('active');
            $('#carousel-example-generic').carousel();

            //var newImage = $("<img>").attr("src", img);
            $("#artist-bio").prepend(newDiv2);
            //$("#artist1").attr("src", img);
        });
    }

    function topArtists() {

        var topURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5261f823d2a8853b4a32607ae232d586&format=json";

        $.ajax({
            url: topURL,
            method: "GET"
        }).done(function(response) {

            var top = [];
            var topPic = [];
            console.log(response);

            for (var i = 0; i < 10; i++) {
                top[i] = response.artists.artist[i].name;
                topPic[i] = response.artists.artist[i].image[3]["#text"];
                var artImg = $("<img>").attr("src", topPic[i]);
                $("#top-ten").append(artImg);
                $("#top-ten").append(top[i]);
            }


        });
    }

    function findSimilar() {

        //store user search parameter
        var artist;
        artist = $("#user-input").val().trim();
        var similarURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=5261f823d2a8853b4a32607ae232d586&format=json";


        $.ajax({
            url: similarURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var topTen = [];
            var topTenPic = [];
            var simImg = [];
            var link = [];
            var picLink;

            for (var i = 0; i < 10; i++) {
                topTen[i] = response.similarartists.artist[i].name;
                topTenPic[i] = response.similarartists.artist[i].image[3]["#text"];
                link[i] = response.similarartists.artist[i].url;
                simImg = $("<img>").attr("src", topTenPic[i]);
                $("#simDiv").append($("<a target='_blank' href=" + link[i] + "><h2>" + topTen[i] + "</h2><img src= '" + topTenPic[i] + "'</a>  "));

                //$("#simDiv").append($("<h2>").append(topTen[i]).append($("<br><divPic>").append(simImg)));

            }
        });
    }

    //when user clicks button for artist name
    $("#get-results").on("click", function(event) {
        event.preventDefault();
        //clear contents after searching
        if ($("#user-input")
            .val() === " ") {
            $("#validate").html("Please enter an artist");
        } else {
            $("#tour-location").empty();
            $("#near-you").empty();
            $("#artist-bio").empty();
            $("#simDiv").empty();
            artistResult();
            eventFinder();
            findSimilar();
        }
    });
    //loads youTube video and lyrics
    $(document).on('click', "#get-results", function(event) {

        event.preventDefault();

        //generate youTube video
        $("#concert").hide();
        var baseUrl = 'http://www.youtube.com/embed?listType=search&list=';
        var searchField = $("#user-input").val();
        var targetUrl = baseUrl + searchField + "&autoplay=1";
        $("#yourIframe").attr("src", targetUrl);
        //generat lyrics link
        var baseUrl = 'http://search.azlyrics.com/search.php?q=';
        var searchField = $("#user-input").val();
        var targetUrl = baseUrl + searchField;

        $("#lLink").attr("href", targetUrl);
    });
    //when user clicks button for top artists
    $("#top-artists").on("click", function(event) {
        event.preventDefault();
        topArtists();
    });


<<<<<<< HEAD
     
		});



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
		//   database.ref().set({
		// 	  image:img 
		//   });
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
=======
>>>>>>> kevinB



});