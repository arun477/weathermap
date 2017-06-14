// javascript engine for weather displayer
// this engine uses openweathermap.org api 
// this engine uses jquery to make json request to the api
//------------------------------------------

// this function takes json object as input and return array of lattitude and longitude as number format.
function coordinates(jsonobject){
	var latlon = [];
	latlon.push(jsonobject.coord.lat, jsonobject.coord.lon);
	return latlon;
}
//-------------------------------------------
// this function takes json object as input and return current weather condition as string.
function weatherCondition(jsonobject){
	var condition = jsonobject.weather[0]["description"];
	return condition;
}
//-------------------------------------------
//this function takes json object as input and return humidity in percentage and format is number.
function humidity(jsonobject){
	var humidit = jsonobject.main.humidity;
	return humidit;
}
//------------------------------------------
//this function takes json object as input and return current temperature and format is number.
function temperature(jsonobject){
	var temp = jsonobject.main.temp;
	temp = temp -273; // this convert kelvin to degree celcius
	return temp;
}
//-------------------------------------------
//this function takes json object as input and return wind speed and format is number.
function windspeed(jsonobject){
	var speed = jsonobject.wind.speed;
	return speed;
}
//-------------------------------------------
//this function takes json object as input and return array of place and country name, format string.
function place(jsonobject){
	var pl =[];
	pl.push(jsonobject.name, jsonobject.country);
	return pl;
}




//-------------------------------------------
//this function takes json object as input return length of the day and the format is in number.
function daylength(jsonobject){
	var day = (jsonobject.sys.sunset - jsonobject.sys.sunrise)/3600;
	
	return day;
}

//-------------------------------------------
//this is google map api function 

function initMap() {
	var uluru = {lat: lati, lng: longi};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

//--------------------------------------------
// jquery engine


$(document).ready(function(){

	
	$("#button").click(function(){
		
		
		var zipcode = document.getElementById("zipinput").value;
		zipcode = parseInt(zipcode);
		console.log(typeof(zipcode));
		if(typeof(zipcode)==="number"){
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					'global': false,
					'url': "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",IN&APPID=03ff4754e1cc27ff1e2c4f59d1408f68" ,
					'dataType': "json",
					'success': function (data) {
						json = data;
					}
				});
				return json;
			})();   console.log(json.coord);
			lati = (json.coord.lat);
			longi = (json.coord.lon);
			condition1 = weatherCondition(json);
			windspeed1 = windspeed(json);
			humidity1 = humidity(json);
			temperature1 = Math.floor(temperature(json));
			placename1 = place(json);
			daylength1 = Math.round(daylength(json));
			console.log(placename1[0]);
			console.log(daylength1);
			console.log(windspeed1);
			$("#wecon").html(condition1);
			$("#wind").html(windspeed1 +"&nbsp;m/s");
			$("#humi").html(humidity1 +"&nbsp;%");
			$("#temp").html(temperature1 +"&nbsp;&deg;C");
			$("#day").html(daylength1 +"&nbsp;hours");
			$("#item3").css("display", "block")
			$("#placename").html(placename1[0]);
			$("body").append(" <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDyofQaKTXm33Xy3iVkJr3j6xh818dfftg&callback=initMap'></script>");
			initMap();

		}
		else {
			$("#item3").css("display", "block");
			$("item3").html("Pleace Enter the Valid Zipcode");
		}
	});


}); 
